import core from '@core/index'
import { container } from 'tsyringe'
import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export const connector = async () => {
  const repositories: any[] = []
  const models : any[] = []
  await core.forEach(async (entity) => {
    await import(entity).then(async (en) => {
      if (en[Object.getOwnPropertyNames(en)[1]]) {
        const nameRepository = await Object.getOwnPropertyNames(en)[1]
        const instance = await en[Object.getOwnPropertyNames(en)[1]]

        await models.push(instance)
        await repositories.push({
          name: nameRepository,
          instance: instance,
        })
      }
    })
  })

  let connection : Connection
  if (process.env.ENVIRONMENT !== 'DEV') {
    connection = await createConnection({
      ...await getConnectionOptions(),
      entities: await models,
    })
  } else {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: await models,
      synchronize: true,
      logging: false,
      name: 'test',
    })
    await repositories.forEach((domain) => {
      container.registerInstance(domain.name, connection.getRepository(domain.instance))
    })
  }

  container.registerInstance('Connection', connection)
  container.registerInstance('QueryRunner', await connection.createQueryRunner())

  return connection
}
