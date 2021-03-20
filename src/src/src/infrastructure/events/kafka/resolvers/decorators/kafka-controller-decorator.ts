
export const kafkaController = (prefix: string = '') : ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target)
    if (!Reflect.hasMetadata('topics', target)) {
      Reflect.defineMetadata('topics', [], target)
    }
  }
}
