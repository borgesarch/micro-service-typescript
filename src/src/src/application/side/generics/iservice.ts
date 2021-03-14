export interface IService<T> {
  create(entity: T): Promise<T>
  update(entity: T): Promise<T>
  remove(entity: T): void
  getById(uid: string): Promise<T>
  getAll(): Promise<Array<T>>
}
