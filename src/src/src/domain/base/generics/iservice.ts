export interface IService<T> {
  create(entity: T): Promise<T>
  update(entity: T) : void
  remove(uid: string): Promise<any>
  getById(uid: string): Promise<T>
  getAll(): Promise<Array<T>>
}
