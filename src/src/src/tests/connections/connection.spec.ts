import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'

describe('Database connection', () => {
  let connection: Connection

  beforeAll(async function () {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      logging: false,
      name: 'test',
    }) as Connection
  })

  afterAll(async function () {
    await connection.close()
  })

  it('should be connected to database', async () => {
    expect(connection?.isConnected).toBeTruthy()
  })
})
