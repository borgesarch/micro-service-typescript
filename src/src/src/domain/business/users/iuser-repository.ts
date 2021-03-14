import { IRepository } from 'src/domain/base/generics/irepository'
import { QueryRunner } from 'typeorm'
import { User } from './user-model'

export interface IUserRepository extends IRepository<User> {
  authenticate(user: User) : Promise<User>
  save(queryRunner: QueryRunner, user:User) : Promise<User>
  getAllPaginated (skip: number, take: number, organization_id : string): Promise<[User[], number]>
}
