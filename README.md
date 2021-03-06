# SIMPLE TYPESCRIPT MICRO SERVICE #


[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](https://github.com/clips/pattern/blob/master/LICENSE.txt) [![License](https://img.shields.io/badge/Typescript-4.1.2-blue.svg?style=flat)](https://github.com/clips/pattern/blob/master/LICENSE.txt) [![License](https://img.shields.io/badge/TypeORM-0.2.28-orange.svg?style=flat)](https://github.com/clips/pattern/blob/master/LICENSE.txt) [![License](https://img.shields.io/badge/KafkaJS-1.15.0-purple.svg?style=flat)](https://github.com/clips/pattern/blob/master/LICENSE.txt) [![License](https://img.shields.io/badge/Hapi-latest-green.svg?style=flat)](https://github.com/clips/pattern/blob/master/LICENSE.txt) 





# #


### Sobre ###

Microserviço projeto para pequenas empresas que deseja expandir e escalar seus negócios digitais.

# #


### Base do conhecimento ###

* [Manual de uso](https://github.com/borgesdeveloper/micro-service-typescript/tree/master/docs)
* [Política de privacidade](https://github.com/borgesdeveloper/micro-service-typescript/tree/master/docs)
* [Padrões e boas práticas](https://github.com/borgesdeveloper/micro-service-typescript/tree/master/docs)


### Inicio rápido

Em seu terminal execute:

Docker:

```sh
$ docker-compose up --build
```

Node:

```sh
$ npm run ms:watch
```

### Kafka Controller


Crie topicos rapidamente com kafkaController:
```typescript

    // tornando seu controlador auto-injetável
    @injectable() 
    @kafkaController()
    export default class TodoController implements IBaseController {
    @kafkaTopic({
        topic: 'user-create',     // definindo seu topico
        group: 'user-group-send', // definindo seu grupo
        partitions: 1, // quantidade de partições
    })
    async create (kafka: Kafka, payload: EachMessagePayload): Promise<void> {
        const { message, topic } = payload
        const result = await JSON.parse((message as any).value)
        const producer = kafka.producer() 
        
        //respondendo o evento ao consumidor
        await producer.connect()
        await producer.send({
            topic: 'user-create-response',
            compression: CompressionTypes.GZIP,
            messages: [{ value: JSON.stringify(result) }],
        })
    }
}

```


### Features

* Hexagonal architecture
* Bounded Contexts
* JWT / OAUTH2(optional)
* Automatic Routes Injectors
* Modular Plugins HTTP
* Automatic Entity Mapping
* Schedule Jobs injectors
* Notification Pattern
* Object-oriented programming
* Globalization (i18n)
* Event Source - KAFKA
* Migrations
* Docker
* Domain-Driven Design
* Generic Repository
* Middleware Injectors
* TsLint
* Babel Compiler
* EsLint
* Unit Test(Jest)


### Autor ###

* Gabriel Borges - Arquiteto de Software
* gabrielborges.web@gmail.com

