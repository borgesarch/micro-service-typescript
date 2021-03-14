export interface IRepository<T> {
  create(entity: T): Promise<T>
  update(entity: T) : Promise<T>
  remove(uid: string): Promise<any>
  getById(uid: string): Promise<T>
  getAll(): Promise<Array<T>>
}
