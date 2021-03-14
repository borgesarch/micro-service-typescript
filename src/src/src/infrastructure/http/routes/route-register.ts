import { container } from 'tsyringe'
import { Request, ResponseToolkit } from '@hapi/hapi'
import { RouteDefinition } from './decorators/route-definition'

const registerRoutes = async (server:any, controller:any) => {
  if (controller) {
    await [controller].forEach(async (controller) => {
      container.register(controller.name, {
        useClass: controller,
      })

      const routes : Array<RouteDefinition> = Reflect.getMetadata('routes', controller)

      if (routes) {
        routes.forEach(async (route) => {
          if (route) {
            server.route({
              path: `${Reflect.getMetadata('prefix', controller)}${(route.path !== '' ? `/${route.path}` : '')}`,
              method: route.requestMethod,
              options: { ...route.options },
              handler: async (request : Request, http: ResponseToolkit) => await ((await container.resolve(controller.name)) as any)[route.methodName](request, http),
            })
          }
        })
      }
    })
  }
}

export default registerRoutes
