import { CompressionTypes, EachMessagePayload, Kafka } from 'kafkajs'
import { IControllerKafka } from '@infrastructure/events/controllers/icontroller-kafka'
import { kafkaController } from '@infrastructure/events/kafka/resolvers/decorators/kafka-controller-decorator'
import { kafkaTopic } from '@infrastructure/events/kafka/resolvers/decorators/route-decorators'
import { injectable } from 'tsyringe'

@injectable()
@kafkaController('users')
export default class EventController implements IControllerKafka {
@kafkaTopic({
  topic: 'user-create',
  group: 'user-group-send',
  partitions: 1,
})
  async create (kafka: Kafka, payload: EachMessagePayload): Promise<void> {
    const { message } = payload

    const result = {
      ...await JSON.parse((message as any).value),
      date: new Date().toISOString(),
    }
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
      topic: 'user-create',
      compression: CompressionTypes.GZIP,
      messages: [
        { value: JSON.stringify(result) },
      ],
    })
  }
}
