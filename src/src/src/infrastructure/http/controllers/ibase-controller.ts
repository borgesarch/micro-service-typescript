import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'

export interface IBaseController{
    getAll (request : Request, http: ResponseToolkit) : Promise<ResponseObject>
    getById (request : Request, http: ResponseToolkit) : Promise<ResponseObject>
    create (request : Request, http: ResponseToolkit) : Promise<ResponseObject>
    update (request : Request, http: ResponseToolkit) : Promise<ResponseObject>
    remove (request : Request, http: ResponseToolkit) : Promise<ResponseObject>
}
