import { injectable } from 'tsyringe'
import { Request, ResponseToolkit } from '@hapi/hapi'
import { postMapping } from '@infrastructure/http/routes/decorators/route-decorators'
import { controller } from '@infrastructure/http/routes/decorators/controller-decorator'

@injectable()
@controller('/webhook/webhook-example')
export default class WeebhookExample {
  @postMapping({
    path: '',
    options: {
      auth: false,
    },
  })
  public async create (request : Request, http: ResponseToolkit) {
    try {
      const data = request.payload as any
      return await http.response({ success: true, data: data })
    } catch (error) {
      return await http.response({ success: false, error: error })
    }
  }
}
