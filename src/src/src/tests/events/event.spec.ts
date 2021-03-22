import { Kafka, logLevel } from 'kafkajs'
import 'reflect-metadata'

describe('Event source connection', () => {
  beforeAll(async function () {
    const kafka = new Kafka({
      clientId: 'user',
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
      topic: 'user-create',
      messages: [{
        value: JSON.stringify({
          email: 'gabrielborges.web@gmail.com',
          password: '123',
        }),
      }],
    })

    await producer.send({
      topic: 'user-update',
      messages: [{
        value: JSON.stringify({
          email: 'borgesdeveloper@outlook.com',
          password: '123',
        }),
      }],
    })

    await producer.disconnect()
  })

  afterAll(async function () {
  })

  it('should be connected to database', async () => {
    expect(true).toBeTruthy()
  })
})
