import { deleteMapping, getMapping, postMapping, putMapping } from '@infrastructure/http/routes/decorators/route-decorators'
import { controller } from '@infrastructure/http/routes/decorators/controller-decorator'
import { IBaseController } from '@infrastructure/http/controllers/ibase-controller'
import { IUserRepository } from '@core/business/users/iuser-repository'
import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'
import { IUserService } from '@services/side/user/iuser-service'
import { User } from '@core/business/users/user-model'
import { inject, injectable } from 'tsyringe'
import { validate } from 'class-validator'

@injectable()
@controller('/v1/users')
export default class UserController implements IBaseController {
  protected userService?: IUserService
  protected userRepository : IUserRepository

  constructor (
    @inject('IUserRepository') userRepository: IUserRepository,
    @inject('IUserService') userService: IUserService,
  ) {
    this.userRepository = userRepository
    this.userService = userService
  }

  @getMapping({
    path: '',
    options: {
      auth: 'authjwt',
    },
  })
  public async getAll (request : Request, http: ResponseToolkit) : Promise<ResponseObject> {
    try {
      const data = await this.userRepository?.getAll()
      return await http.response({
        data: [...data],
      })
    } catch (error) {
      return await http.response({
        ...error,
      }).code(400)
    }
  }

  @getMapping({
    path: '{skip}/{take}',
    options: {
      auth: 'authjwt',
    },
  })
  public async getAllPaginated (request : Request, http: ResponseToolkit) : Promise<ResponseObject> {
    try {
      const b1Organization = request.headers['b1-organization']
      const { skip, take } = request.params
      const data = await this.userRepository?.getAllPaginated(
        skip,
        take,
        b1Organization,
      )

      return http.response({
        success: true,
        data: [...data[0]],
        total: data[1],
        skip: skip as number,
        take: take as number,
      })
    } catch (error) {
      return http.response({
        succes: false,
        error: { ...error },
      }).code(400)
    }
  }

  @getMapping({
    path: '{id}',
    options: {
      auth: 'authjwt',
    },
  })
  public async getById (request : Request, http: ResponseToolkit) : Promise<ResponseObject> {
    try {
      const { id } = request.params
      const data = await this.userService?.getById(id)
      return http.response({
        success: true,
        data: { ...data },
      })
    } catch (error) {
      return http.response({
        ...error,
        message: error.message,
      }).code(400)
    }
  }

  @postMapping({
    path: '',
    options: {
      auth: 'authjwt',
    },
  })
  public async create (request : Request, http: ResponseToolkit) : Promise<ResponseObject> {
    try {
      const parseUser: User = new User()
      Object.assign(parseUser, request.payload)
      const errors = await parseUser.validate()

      if (errors.length > 0) {
        return http.response({
          data: errors,
        }).code(400)
      }
      const data = await this.userService?.create(parseUser)
      return http.response({
        data: data,
      })
    } catch (error) {
      return http.response({
        error: Array.isArray(error) ? [...error] : { error },
      }).code(400)
    }
  }

  @putMapping({
    path: '',
    options: {
      auth: 'authjwt',
    },
  })
  public async update (request : Request, http: ResponseToolkit) : Promise<ResponseObject> {
    try {
      const parseUser: User = new User()
      Object.assign(parseUser, request.payload)
      const errors = await validate(parseUser)

      if (errors.length > 0) {
        return http.response({
          data: errors,
        }).code(400)
      }

      const data = await this.userService?.update(parseUser)
      return http.response({
        success: true,
        data: data,
      })
    } catch (error) {
      return http.response({
        ...error,
      }).code(400)
    }
  }

  @deleteMapping({
    path: '{id}',
    options: {
      auth: 'authjwt',
    },
  })
  public async remove (request : Request, http: ResponseToolkit) : Promise<ResponseObject> {
    try {
      const { id } = request.params
      await this.userService?.removeById(id)
      return http.response({
        succes: true,
      })
    } catch (error) {
      return http.response({
        success: false,
        error: { ...error },
      }).code(400)
    }
  }
}
