import { User } from 'src/domain/business/users/user-model'

export interface IAuthService {
  authenticate(user: User): any
  register(user: User): any
}
