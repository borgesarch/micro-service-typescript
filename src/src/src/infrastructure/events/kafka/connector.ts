const { Kafka } = require('kafkajs')

export const kafkaConnector = async () => await new Kafka({
  clientId: 'ms-user',
  brokers: ['kafka1:9092', 'kafka2:9092'],
})
