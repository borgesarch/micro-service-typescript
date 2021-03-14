import { inject, injectable } from 'tsyringe'
import { IUserService } from './iuser-service'
import i18n from 'i18n'
import { IUserRepository } from '@core/business/users/iuser-repository'
import { IDataConnection } from '@infrastructure/data/connections/idata-connection'
import { User } from '@core/business/users/user-model'
import { Md5 } from 'md5-typescript'

@injectable()
export class UserService implements IUserService {
  protected userRepository: IUserRepository
  protected dataConnection : IDataConnection

  constructor (
    @inject('IUserRepository') userRepository: IUserRepository,
    @inject('IDataConnection') dataConnection : IDataConnection,
  ) {
    this.dataConnection = dataConnection
    this.userRepository = userRepository
  }

  async removeById (id: string) {
    try {
      await this.dataConnection.startTransaction()
      const userFound = await this.getById(id)
      if (!userFound) {
        throw new Error(
          i18n.__('user.error.notfound'))
      }
      await this.userRepository.remove(userFound.id)
      await this.dataConnection.commitTransaction()
    } catch (error) {
      await this.dataConnection.rollbackTransaction()
      throw error
    }
  }

  async create (user: User): Promise<User> {
    try {
      await this.dataConnection.startTransaction()
      user.password = await Md5.init(user.password)
      await this.userRepository?.create(user)
      await this.dataConnection.commitTransaction()
      return user
    } catch (error) {
      console.log(error)
      await this.dataConnection.rollbackTransaction()
      throw error
    }
  }

  async update (user: User): Promise<User> {
    try {
      await this.dataConnection.startTransaction()
      user = await this.userRepository?.update(user)
      await this.dataConnection.commitTransaction()
      return user
    } catch (error) {
      await this.dataConnection.rollbackTransaction()
      throw error
    }
  }

  async remove (user: User) {
    try {
      await this.dataConnection.startTransaction()

      await this.userRepository.remove(user.id)
      await this.dataConnection.commitTransaction()
    } catch (error) {
      await this.dataConnection.rollbackTransaction()
      throw error
    }
  }

  async getById (uid: string): Promise<User> {
    const userFound = (await this.userRepository.getById(uid)) as User

    if (!userFound) {
      throw new Error(
        i18n.__('user.error.notfound'))
    }

    return userFound
  }

  async getAll (): Promise<User[]> {
    return await this.userRepository.getAll()
  }
}
