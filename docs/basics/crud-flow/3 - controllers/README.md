# 3° Passo: Criando um Controlador #


### 1° Crie um controlador TodoController ##

Navegue até a pasta presentation/controllers e crie uma pasta `todo` e dentro da mesma pasta um arquivo `todo-controller.ts`  

```
src
 │
 ├─⊳ domain    
 ├─⊳ infrastructure
 ├─ presentation
 │   └─⊳ controllers       
 │       └─⊳ todos                            // crie uma pasta
 │           └─⊳ todo-controller.ts           // crie uma classe
 └─⊳ application
 
```

Resultado:

`todo-controller.ts`

```typescript

    // tornando seu controlador auto-injetável
    @injectable()
    // ao adicionar este decorador automaticamente uma rota é registrada no url http://{url}:{port}/v1/todos 
    @controller('/v1/todos')
    export default class TodoController implements IBaseController {

    }

```


### 2° - Implemente a interface IBaseController: ###

Resultado:

`todo-controller.ts`

```typescript


    @injectable()
    @controller('/v1/todos')
    export default class TodoController implements IBaseController {
        
        async getAll (request : Request, http: ResponseToolkit) : Promise<ResponseObject> { 
            return null 
        }
        
        async getById (request : Request, http: ResponseToolkit) : Promise<ResponseObject> {
            return null 
        }

        async create (request : Request, http: ResponseToolkit) : Promise<ResponseObject> { 
            return null 
        }

        async update (request : Request, http: ResponseToolkit) : Promise<ResponseObject> { 
            return null 
        }

        async remove (request : Request, http: ResponseToolkit) : Promise<ResponseObject> { 
            return null 
        }
    }

```

### 3° - Adicione os decoradores: ###

Mapeadores disponíveis:

`` METHODS ``  
```typescript
    @postMapping({})
    @getMapping({})
    @putMapping({})
    @deleteMapping({})
``` 

Resultado:

`todo-controller.ts`

```typescript


...

    @postMapping({
        path: '',
        options: {
            auth: 'authjwt', // caso público adicionar auth:false
        },
    })
    public async create (request : Request, http: ResponseToolkit) {
        return null
    }
}

...

```


### 4° Adicione respostas http: ###


```typescript

    @injectable()
    @controller('/v1/todos')
    export default class TodoController implements IBaseController {

    @postMapping({
        path: '',
        options: {
            auth: 'authjwt',
        },
    })
    public async create (request : Request, http: ResponseToolkit) {
        try{
            return await http.response({
                    success: true,
                    data: { 
                        message : 'Este é o meu Payload!', 
                        payload: request.payload as any 
                    },
                }).code(200) // ou 201
            }catch(error){
                return await http.response({
                    success: true,
                    data: { 
                        error: {...error} ,
                        message : `Ops! ${error.message}`
                    },
                }).code(400) // retorne o erro apropriado para o seu caso
            }
        }
    }

```

### 5° repita o processo para os demais métodos implementados ###


Resultado:

`todo-controller.ts`

```typescript

    @injectable()
    @controller('/v1/todos')
    export default class TodoController implements IBaseController {


        @postMapping({
            path: '',
            options: {
                auth: 'authjwt', // caso público adicionar false, caso privado adicione 'authjwt'
            },
        })
        public async create (request : Request, http: ResponseToolkit) {
            try{
                return await http.response({
                        success: true,
                        data: { 
                            message : 'Este é o meu Payload!', 
                            payload: request.payload as any 
                        },
                    }).code(200) // ou 201
                }catch(error){
                    return await http.response({
                        success: true,
                        data: { 
                            error: {...error} ,
                            message : `Ops! ${error.message}`
                        },
                    }).code(400) // retorne o erro apropriado para o seu caso
                }
            }
        

        @getMapping({
            path: '',
            options: {
                auth: 'authjwt',
            },
        })
        public async getAll (request : Request, http: ResponseToolkit) {
            try{
                return await http.response({
                        success: true,
                        data: [],
                    }).code(200)
                }catch(error){
                    return await http.response({
                        success: true,
                        data: { 
                            error: {...error} ,
                            message : `Ops! ${error.message}`
                        },
                    }).code(400) 
                }
            }

        @putMapping({
            path: '',
            options: {
                auth: 'authjwt', // caso público adicionar false, caso privado adicione 'authjwt'
            },
        })
        public async update (request : Request, http: ResponseToolkit) {
            try{
                return await http.response({
                        success: true,
                        data: { 
                            message : 'Este é o meu Payload!', 
                            payload: request.payload as any 
                        },
                    }).code(200) // ou 201
                }catch(error){
                    return await http.response({
                        success: true,
                        data: { 
                            error: {...error} ,
                            message : `Ops! ${error.message}`
                        },
                    }).code(400) // retorne o erro apropriado para o seu caso
                }
            }


        @deleteMapping({
            path: '{id}',
            options: {
                auth: 'authjwt',
            },
        })
        public async remove (request : Request, http: ResponseToolkit) {
            try{
                return await http.response({
                        success: true,
                        data: { 
                            message : 'Este é o meu {id}!', 
                            params: request.params.id as any 
                        },
                    }).code(200) // ou 201
                }catch(error){
                    return await http.response({
                        success: true,
                        data: { 
                            error: {...error} ,
                            message : `Ops! ${error.message}`
                        },
                    }).code(400)
                }
            }
    }

```





