import { container } from 'tsyringe'
import { TopicDefinition } from './decorators/topic-definition'
import { Kafka } from 'kafkajs'

const registerTopic = async (kafka:Kafka, controller:any) => {
  if (controller) {
    await [controller].forEach(async (controller) => {
      container.register(controller.name, {
        useClass: controller,
      })
      const topics : Array<TopicDefinition> = Reflect.getMetadata('topics', controller)
      if (topics) {
        topics.forEach(async (topic) => {
          if (topic) {
            console.log(topic)
            const consumer = kafka.consumer({ groupId: topic.group })
            await consumer.connect()
            await consumer.subscribe({ topic: topic.topic })
            await consumer.run({
              eachMessage: async (context : { topic:any, partition:any, message:any}) =>
                await ((await container.resolve(controller.name)) as any)[topic.methodName](kafka, context),
            })
          }
        })
      }
    })
  }
}

export default registerTopic
