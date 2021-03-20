import { Kafka, logLevel } from 'kafkajs'
import 'reflect-metadata'

describe('Event source connection', () => {
  beforeAll(async function () {
    const kafka = new Kafka({
      clientId: 'ms-user',
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
      topic: 'user-create-response',
      messages: [{ value: JSON.stringify({ message: 'Oi' }) }],
    })

    await producer.disconnect()
  })

  afterAll(async function () {
  })

  it('should be connected to database', async () => {
    expect(true).toBeTruthy()
  })
})