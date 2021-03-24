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
          organization_id: '1',
          active: true,
        }),
      }],
    })

    await producer.send({
      topic: 'user-get',
      messages: [{
        value: JSON.stringify({
          skip: 1,
          take: 20,
          organization_id: 1,
        }),
      }],
    })

    await producer.disconnect()
  })

  afterAll(async function () {
  })

  it('Kafka test completed it succesful', async () => {
    expect(true).toBeTruthy()
  })
})
