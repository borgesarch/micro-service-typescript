import { TopicDefinition } from './topic-definition'

export const kafkaTopic = ({ topic, group, partitions } : { topic: string; group: string; partitions : number }): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('topics', target.constructor)) {
      Reflect.defineMetadata('topics', [], target.constructor)
    }

    const topics = Reflect.getMetadata('topics', target.constructor) as Array<TopicDefinition>

    topics.push({
      topic: topic,
      group: group,
      methodName: propertyKey,
      partitions: partitions,
    })

    Reflect.defineMetadata('topics', topics, target.constructor)
  }
}
