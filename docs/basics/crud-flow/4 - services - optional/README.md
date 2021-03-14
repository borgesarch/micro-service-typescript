# 4° - Passo: Criando um serviço #



### 1° -  Criando os arquivos necessários: ###

 Navegue até a pasta application/side e crie uma pasta `todos` e adicone dois  arquivos o primeiro sendo uma interface `itodo-service.ts` e o outro uma classe `todo-service.ts` 
# #
```
    src
    │
    ├─> domain    
    ├─> infrastructure
    ├─> appllication
    │   └─> outside       
    │   └─> side                      
    │       └─ todo   
    │           └─> todo-service.ts         // crie um class de serviço aqui
    |           └─> itodo-service.ts        // crie um  interface de  serviço aqui
    └─> presentation
 
```

# #

### 2° - Criando a inteface: ###

Crie uma interface e implemente extenda a interface IService<>:


``itodo-service.ts``

```typescript

    export interface ITodoService extends IService<Todo> {}

```

# #

### 3° - Crie a classe: ###

Crie uma classe e implemente a interface ITodoService

``todo-service.ts``

```typescript


    @injectable()
    export class TodoService implements ITodoService {

        protected todoRepository: ITodoRepository

        constructor (@inject('ITodoRepository') todoRepository: ITodoRepository) {
            this.todoRepository = todoRepository
        }

        async save (todo: Todo) : Promise<Todo> {
            return await this.todoRepository.save(todo)
        }

        async getAll () : Promise<Todo[]> {
            return await this.repository.getAll()
        }

        async update (todo: Todo) : Promise<any>{
            return await this.todoRepository.update(todo)
        }

        async remove (uid: string) : Promise<any> {
            return await this.repository.remove(uid)
        }

        async getById (uid: string) : Promise<Todo> {
            return await this.repository.getById(uid)
        }
    }


```

# #

## 4° - Injete o serviço no IOC ##

Vá até a pasta infrastructure/ioc no arquivo ``io.ts`` e faça a injeção do seu serviço para que ele funcione corretamente no seu controlador:


```
    src
    │
    ├─> domain    
    ├─> infrastructure
    │   └─> ioc
    │        └─> ioc.ts                        // inject aqui
    ├─> presentation
    └─> application
```


``ioc.ts``

```typescript

    container.register('ITodoService', { useClass: TodoService })
    
```
