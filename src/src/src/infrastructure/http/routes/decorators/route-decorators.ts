import { RouteDefinition } from './route-definition'

export const getMapping = ({ path, options = {}, config = {} } : { path: string; options: any; config: any }): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>

    routes.push({
      requestMethod: 'get',
      path,
      methodName: propertyKey,
      options,
      config,
    })

    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export const postMapping = ({ path, options = {}, config = {} } : { path: string; options: any; config:any }): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>

    routes.push({
      requestMethod: 'post',
      path,
      methodName: propertyKey,
      options,
      config,
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export const putMapping = ({ path, options = {}, config = {} } : { path: string; options: any; config:any; }): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>

    routes.push({
      requestMethod: 'put',
      path,
      methodName: propertyKey,
      options,
      config,
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export const deleteMapping = ({ path, options = {}, config = {} } : { path: string; options: any; config : any }): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>

    routes.push({
      requestMethod: 'delete',
      path,
      methodName: propertyKey,
      options,
      config,
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}
