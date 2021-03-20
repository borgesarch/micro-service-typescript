import { Kafka, logLevel } from 'kafkajs'

export const kafkaConnector = () => new Kafka({
  clientId: 'ms-user',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
})
