# 1° Passo: Criando entidade de domínio #


### 1° Crie um modelo todo-model.ts ###

 Navegue até a pasta domain/business e crie uma pasta `todo` e dentro da mesma pasta um arquivo `todo-model.ts`  

```
src
 │
 ├─⊳ domain    
 │   └─⊳ business       
 │       └─⊳ todos                       // crie uma pasta
 │           └─⊳ todo-model.ts           // crie uma classe
 │
 │
 ├─⊳ infrastructure
 ├─⊳ presentation
 └─⊳ application
 
```

# #

### 2° - Crie uma classe e extenda a classe Base ###

Adicione as propriedades pertinentes ao seu domínio de negócio:

```typescript

    @Repository()
    @Entity({ name: 'users' })
    export class Todo extends Base {
        
        @IsEmail()
        @IsNotEmpty({ message: 'Sua mensagem de validação aqui' })
        @Column()
        public email: string

        @IsNotEmpty({ message: 'Sua mensagem de validação aqui' })
        @Column()
        public name: string

        @IsBoolean()
        @IsNotEmpty({ message: 'Sua mensagem de validação aqui' })
        @Column()
        public active: boolean
    }

```
