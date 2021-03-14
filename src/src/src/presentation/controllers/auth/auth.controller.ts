import { inject, injectable } from 'tsyringe'
import { Request, ResponseToolkit } from '@hapi/hapi'
import { controller } from '@infrastructure/http/routes/decorators/controller-decorator'
import { IAuthService } from '@services/side/auth/iauth-service'
import { IUserService } from '@services/side/user/iuser-service'
import { getMapping, postMapping, putMapping } from '@infrastructure/http/routes/decorators/route-decorators'
import { User } from '@core/business/users/user-model'
import { Md5 } from 'md5-typescript'

@injectable()
@controller('/authentication')
export default class AuthController {
  protected authService?: IAuthService
  protected userService?: IUserService

  constructor (
      @inject('IAuthService') authService: IAuthService,
      @inject('IUserService') userService: IUserService,
  ) {
    this.authService = authService
    this.userService = userService
  }

  @getMapping({
    path: '',
    options: {
      auth: false,
    },
  })
  public async test (request : Request, http: ResponseToolkit) {
    return http.response({
      data: true,
    })
  }

  @putMapping({
    path: 'sign-up',
    options: {
      auth: false,
    },
  })
  public async signUp (request : Request, http: ResponseToolkit) {
    try {
      const user = request.payload as User
      const userCreated = await this.authService?.register(user)

      return await http.response({
        success: true,
        data: userCreated,
      })
    } catch (error) {
      if (Array.isArray(error)) {
        return await http
          .response({
            erros: [...error],
          }).code(400)
      }
      return await http
        .response({
          ...error,
        }).code(400)
    }
  }

  @postMapping({
    path: 'sign-in',
    options: {
      auth: false,
    },
  })
  public async signIn (request : Request, http: ResponseToolkit) {
    try {
      const user = request.payload as User
      user.password = await Md5.init(user.password)
      const token = await this.authService?.authenticate(user)
      return await http.response({
        success: true,
        token: token,
      })
    } catch (error) {
      return await http
        .response({
          error: error.message,
          message: 'user not found!',
        }).code(400)
    }
  }
}
