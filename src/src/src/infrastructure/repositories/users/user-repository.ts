import { IUserRepository } from 'src/domain/business/users/iuser-repository'
import { User } from 'src/domain/business/users/user-model'
import { IDataConnection } from 'src/infrastructure/data/connections/idata-connection'
import { inject, injectable } from 'tsyringe'
import { Connection, QueryRunner, Repository } from 'typeorm'
@injectable()
export class UserRepository implements IUserRepository {
  protected repository: Repository<User>
  protected connection: Connection
  protected dataConnection : IDataConnection

  constructor (
    @inject('IDataConnection') dataConnection: IDataConnection,
    @inject('Connection') connection: Connection,
    @inject('User') repository: Repository<User>) {
    this.repository = repository
    this.connection = connection
    this.dataConnection = dataConnection
  }

  async update (user: User) {
    await this.repository
      .createQueryBuilder()
      .update(User)
      .set(user)
      .where('id = :id', { id: user.id })
      .useTransaction(this.dataConnection.inTransaction())
      .execute()
    return user
  }

  async getAllPaginated (skip: number, take: number, organization_id : string): Promise<[User[], number]> {
    return await this.connection
      .getRepository(User)
      .createQueryBuilder('users')
      .where('users.organization_id = :organizationId')
      .orderBy('users.id', 'DESC')
      .skip(skip)
      .take(take)
      .setParameters({ organizationId: organization_id })
      .getManyAndCount()
  }

  async remove (uid: string): Promise<any> {
    return await this.dataConnection.getConnection()?.createQueryBuilder()
      .delete().from(User).where('id = :id', { id: uid })
      .useTransaction(this.dataConnection.inTransaction())
      .execute()
  }

  async getById (uid: string): Promise<User> {
    return (await this.repository?.findOneOrFail({
      id: uid,
    })) as User
  }

  async create (user: User): Promise<User> {
    if (this.dataConnection.inTransaction()) {
      return await this.save(this.dataConnection.getQueryRunner(), user)
    }
    return (await this.repository?.save(user)) as User
  }

  async authenticate (user: User): Promise<User> {
    return (await this.repository?.findOne({
      email: user.email,
      password: user.password,
    })) as User
  }

  async getAll (): Promise<User[]> {
    return (await this.repository?.find()) || []
  }

  async save (queryRunner: QueryRunner, user:User): Promise<User> {
    const parseUser = new User()
    Object.assign(parseUser, user)
    return await queryRunner.manager.save(parseUser as User)
  }
}
