import { injectable } from 'tsyringe'
import { IExternalService } from './iexternal-service'

@injectable()
export class ExternalService implements IExternalService {
  public calling () {
    return 'answered'
  }
}
