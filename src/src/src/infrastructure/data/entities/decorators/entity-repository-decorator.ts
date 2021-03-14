
export const Repository = () : ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('repository:entity', true, target)
  }
}
