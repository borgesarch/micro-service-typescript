import { injectable } from 'tsyringe'
import { Request, ResponseToolkit } from '@hapi/hapi'
import { postMapping } from '@infrastructure/http/routes/decorators/route-decorators'
import { controller } from '@infrastructure/http/routes/decorators/controller-decorator'
import { CompressionTypes, Kafka, logLevel } from 'kafkajs'

@injectable()
@controller('/kafka-test')
export default class KafkaTestController {
  @postMapping({
    path: '',
    options: {
      auth: false,
    },
  })
  public async create (request : Request, http: ResponseToolkit) {
    try {
      const kafka = new Kafka({
        clientId: 'api',
        brokers: ['localhost:9092'],
        logLevel: logLevel.WARN,
        retry: {
          initialRetryTime: 300,
          retries: 10,
        },
      })
      const producer = kafka.producer()
      await producer.connect()
      await producer.send({
        topic: 'user-create',
        compression: CompressionTypes.GZIP,
        messages: [
          { value: JSON.stringify(request.payload) },
        ],
      })

      return await http.response({ success: true, data: { date: new Date().toISOString(), ...(request.payload as any) } })
    } catch (error) {
      console.log(error)
      return await http.response({ success: false, error: error }).code(400)
    }
  }
}
