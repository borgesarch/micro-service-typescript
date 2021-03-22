import { EachMessagePayload, Kafka } from 'kafkajs'
import { IControllerKafka } from '@infrastructure/events/controllers/icontroller-kafka'
import { kafkaController } from '@infrastructure/events/kafka/resolvers/decorators/kafka-controller-decorator'
import { kafkaTopic } from '@infrastructure/events/kafka/resolvers/decorators/route-decorators'
import { injectable } from 'tsyringe'

@injectable()
@kafkaController('users-response')
export default class EventResponseController implements IControllerKafka {
  @kafkaTopic({
    topic: 'user-update-response',
    group: 'user-update',
    partitions: 1,
  })
  async update (kafka: Kafka, payload: EachMessagePayload): Promise<void> {
    const { message } = payload

    const result = {
      ...await JSON.parse((message as any).value),
      date: new Date().toISOString(),
    }
    console.log(result)
  }

  @kafkaTopic({
    topic: 'user-create-response',
    group: 'user-group-create',
    partitions: 1,
  })
  async create (kafka: Kafka, payload: EachMessagePayload): Promise<void> {
    const { message } = payload

    const result = {
      ...await JSON.parse((message as any).value),
      date: new Date().toISOString(),
    }
    console.log(result)
  }
}
