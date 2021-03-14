import { ResponseToolkit, Request, Server } from '@hapi/hapi'
import { B1Headers } from '@infrastructure/cross-cutting/enuns/headers-enum'

export default async (server: Server) => {
  await server.ext('onPostHandler', async (request : Request, http : ResponseToolkit) => {
    const organization_header = request.headers[B1Headers.b1_oraganization]
    if (!organization_header) {
      return await http.response({
        success: false,
        error: 'Header b1-organization undefined o empty!',
        headers: request.headers,
      }).code(400)
    }
    return await http.continue
  })
}
