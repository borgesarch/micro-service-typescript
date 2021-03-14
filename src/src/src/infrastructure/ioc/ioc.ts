import { UserRepository } from '@infrastructure/repositories/users/user-repository'
import { ExternalService } from '@services/outside/externals/external-service'
import DataConnection from '@infrastructure/data/connections/data-connection'
import registerRoutes from '@infrastructure/http/routes/route-register'
import { connector } from '@infrastructure/data/connector/connector'
import { UserService } from '@services/side/user/user-service'
import { AuthService } from '@services/side/auth/auth-service'
import initServer from '@infrastructure/http/routes/server'
import controllers from 'src/presentation/index'
import { container } from 'tsyringe'
import * as dotenv from 'dotenv'
import { kafkaConnector } from '@infrastructure/events/kafka/connector'
import { userConsumer } from '@infrastructure/events/kafka/consumers/user-consumer'
dotenv.config()

export default class Ioc {
  async resolveContext () {
    const connection = await connector()
    await Promise.all([
      await connection.runMigrations(),
      await connection.synchronize()],
    )
  }

  public async resolve () {
    /* * * * * * * * * * * * * * * * * * * * * * * *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *           INJECT AND RESOLVE ROUTES           *
    *                                               *
    *                                               *
    *                ┊┊╭━━━╮┊┊╭━━━╮┊┊               *
    *                ┊┊┃┈▋▋┃┊┊┃▋▋┈┃┊┊               *
    *                ┏━╯┈┈┈◣┊┊◢┈┈┈╰━┓               *
    *                ┃┗━╯┈┈┃┊┊┃┈┈╰━┛┃               *
    *                ╰━┳━┳━╯┊┊╰━┳━┳━╯               *
    *                ━━┻━┻━━━━━━┻━┻━━               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
     * * * * * * * * * * * * * * * * * * * * * * * */

    await this.resolveRoutes()

    /* * * * * * * * * * * * * * * * * * * * * * * *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *          INJECT AND RESOLVE CONTEXTS          *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    * * * * * * * * * * * * * * * * * * * * * * * * */

    await this.resolveContext()

    /* * * * * * * * * * * * * * * * * * * * * * * *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *          INJECT AND RESOLVE INTERFACES        *
    *          (NAME OF INTERFACE AND CLASS)        *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    *                                               *
    * * * * * * * * * * * * * * * * * * * * * * * * */

    container.register('IAuthService', { useClass: AuthService })
    container.register('IDataConnection', { useClass: DataConnection })
    container.register('IUserService', { useClass: UserService })
    container.register('IExternalService', { useClass: ExternalService })
    container.register('IUserRepository', { useClass: UserRepository })

    /* * * * * * * * * * * * * * * * * * * * * * * *
    *                                               *
    *                                               *
    *                                               *
    *               KAFKA INJECTION                 *
    *                                               *
    *                                               *
    *                                               *
    * * * * * * * * * * * * * * * * * * * * * * * */
    const kafkaConnetor = await kafkaConnector()
    await userConsumer(kafkaConnetor) // disable if not use KAFKA
  }

  async resolveRoutes () {
    await initServer().then(async (server:any) => {
      controllers.forEach(async (controller: any) => {
        await import(controller).then(async (control) => {
          await registerRoutes(server, control.default)
        })
      })
    }).catch(console.log)
  }
}
