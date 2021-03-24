import { CompressionTypes, EachMessagePayload, Kafka } from 'kafkajs'
import { IControllerKafka } from '@infrastructure/events/controllers/icontroller-kafka'
import { kafkaController } from '@infrastructure/events/kafka/resolvers/decorators/kafka-controller-decorator'
import { kafkaTopic } from '@infrastructure/events/kafka/resolvers/decorators/route-decorators'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@core/business/users/iuser-repository'
import { User } from '@core/business/users/user-model'

@injectable()
@kafkaController()
export default class UserEventController implements IControllerKafka {
  private userRepository : IUserRepository
  constructor (@inject('IUserRepository') userRepository : IUserRepository) {
    this.userRepository = userRepository
  }

@kafkaTopic({
  topic: 'user-create',
  group: 'user-group-send',
  partitions: 1,
})
  async create (kafka: Kafka, payload: EachMessagePayload): Promise<void> {
    const { message } = payload
    const user = await this.userRepository.create(Object.assign(await JSON.parse((message as any).value), User))
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
      topic: 'user-create-response',
      compression: CompressionTypes.GZIP,
      messages: [
        { value: JSON.stringify(user) },
      ],
    })
  }

  @kafkaTopic({
    topic: 'user-update',
    group: 'user-group-update',
    partitions: 1,
  })
async update (kafka: Kafka, payload: EachMessagePayload): Promise<void> {
  const { message } = payload

  const result = {
    ...await JSON.parse((message as any).value),
    date: new Date().toISOString(),
  }
  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'user-update-response',
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(result) },
    ],
  })
}

@kafkaTopic({
  topic: 'user-get',
  group: 'user-group-get',
  partitions: 1,
})
  async getAll (kafka: Kafka, payload: EachMessagePayload): Promise<void> {
    const { message } = payload
    // const { skip, take, organization_id} = await JSON.parse((message as any).value)
    const data = await this.userRepository.getAll()
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
      topic: 'user-get-response',
      compression: CompressionTypes.GZIP,
      messages: [
        { value: JSON.stringify(data) },
      ],
    })
  }
}
