import { ResponseToolkit, Request, Server } from '@hapi/hapi'
export default async (server: Server) => {
  await server.ext('onPostHandler', async (request : Request, http : ResponseToolkit) => {
    
    /**
     *  YOUR LOGIC MIDDLEWARE
     * 
     */
    
    return await http.continue
  })
}
