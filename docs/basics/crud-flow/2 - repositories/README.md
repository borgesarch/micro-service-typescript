# 2° Passo: Criando repositório #


### 1° - Crie uma interface de domínio e uma entidade ###

Navegue até a pasta domain/business e crie uma arquivo `itodo-repository.ts` dentro da pasta `todos`  

```
src
 │
 ├─⊳ domain    
 │   └─⊳ business       
 │       └─⊳ todos                      
 │           └─⊳ todo-model.ts
 |           └─⊳ itodo-repository.ts        // crie uma interface aqui
 ├─⊳ infrastructure
 │   └─⊳ repositories
 │        └─⊳ todos                        // crie uma pasta todos
 │          └─⊳ todo-repository.ts         // crie uma classe aqui
 ├─⊳ presentation
 └─⊳ application
 
```


### 2° - Criando uma interface de domínio ###

Crie uma interface com e extenda a interface IRepository<>:

Resultado: 

``itodo-repository.ts``


```typescript

    export interface ITodoRepository extends IRepository<Todo> {}

```

### 3° - Criando uma classe e implementando a interface de domínio ###

Criar um repositório e implemente a interface de domínio criada:

Resultado: 

``todo-repository.ts``

```typescript

    @injectable()
    export class TodoRepository implements ITodoRepository {

        protected repository: Repository<Todo>
        protected connection: Connection
        protected dataConnection : IDataConnection
        protected inTransaction : boolean

        constructor (
            @inject('IDataConnection') dataConnection: IDataConnection,
            @inject('Connection') connection: Connection,
            @inject('Todo') repository: Repository<Todo>) {
            this.repository = repository
            this.connection = connection
            this.dataConnection = dataConnection
            this.inTransaction = this.dataConnection.inTransaction()
        }

        async save (todo: Todo): Promise<Todo> {
            return await this.repository.save(todo)
        }

        async getAll (): Promise<Todo[]> {
            return await this.repository.find()
        }

        async update (todo: Todo) {
            await this.repository
                .createQueryBuilder()
                .update(User)
                .set({ 
                    id: todo.id, 
                    email: todo.email, 
                    name: todo.name 
                }).where('id = :id', { id: todo.id })
                .useTransaction(this.inTransaction) 
                .execute()
        }

        async remove (uid: string): Promise<any> {
            return await this.dataConnection.getConnection().createQueryBuilder()
            .delete()
            .from(Todo)
            .where('id = :id', { id: uid }) 
            .useTransaction(this.inTransaction) 
            .execute()
        }

        async getById (uid: string): Promise<Todo> {
            return await this.repository?.findOneOrFail({
                id: uid, 
            })
        }
    }


```


4° vá até a pasta infrastructure/ioc no arquivo io.ts


Faça a injeção do seu repositório para que ele funcione corretamente no seu controlador:


```
src
 │
 ├─⊳ domain    
 ├─⊳ infrastructure
 │   └─⊳ ioc
 │        └─⊳ ioc.ts                        // inject aqui
 ├─⊳ presentation
 └─⊳ application
```


``ioc.ts``

```typescript

    container.register('ITodoRepository', { useClass: TodoRepository })
    
```
