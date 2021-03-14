import { User } from 'src/domain/business/users/user-model'
import { IService } from '../generics/iservice'
export interface IUserService extends IService<User> {
  removeById(id:string) : void
}
