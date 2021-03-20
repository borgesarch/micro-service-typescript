import { User } from '@core/business/users/user-model'
import { UserService } from '@services/side/user/user-service'
import { container } from 'tsyringe'

export default async (kafka : any) => {
  const consumer = kafka.consumer({ groupId: 'user-group' })

  const producer = kafka.producer()
  producer.connect()

  await consumer.connect()
  await consumer.subscribe({ topic: 'user-create' })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }:{ topic:any, partition:any, message:any}) => {
      const payload = JSON.parse(message.value)
      const userService = container.resolve<UserService>('IUserService')
      const user = await userService.create(Object.assign(payload, User))
      producer.send({
        topic: 'user-create-response',
        messages: [
          { value: JSON.stringify(user) },
        ],
      })
    },
  })
}
