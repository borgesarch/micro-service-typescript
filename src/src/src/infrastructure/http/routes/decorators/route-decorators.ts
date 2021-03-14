import { RouteDefinition } from './route-definition'

export const getMapping = ({ path, options = null } : { path: string; options: any; }): MethodDecorator => {
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
    })

    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export const postMapping = ({ path, options = {} } : { path: string; options: any; }): MethodDecorator => {
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
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export const putMapping = ({ path, options = {} } : { path: string; options: any; }): MethodDecorator => {
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
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export const deleteMapping = ({ path, options = {} } : { path: string; options: any; }): MethodDecorator => {
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
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}
