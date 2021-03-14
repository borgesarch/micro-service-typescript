import { User } from '@core/business/users/user-model'
import { UserService } from '@services/side/user/user-service'
import { container } from 'tsyringe'

export const userConsumer = async (kafka : any) => {
  const userService = container.resolve<UserService>('IUserService')

  const consumer = kafka.consumer({ groupId: 'user-group' })
  const producer = kafka.producer({ groupId: 'user-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'user-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: {topic:any, partition:any, message: any}) => {
      await producer.connect()

      let user : User = new User()

      user = await userService.create(Object.assign(message.value.toString(), User))
      console.table({ topic, partition, value: message.value.toString() })
      await producer.send({
        topic: 'user-topic-response',
        messages: [{ value: JSON.stringify(user) }],
      })
      await producer.disconnect()
    },
  })
}
