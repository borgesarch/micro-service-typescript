# CRIANDO UM CRON JOB E INJETANDO UM SERVIÇO #


### 1° Crie um cron job schedule-job ###

 Navegue até a pasta infrastructure/cron-jobs e crie uma pasta `todo` e dentro da mesma pasta um arquivo `todo-model.ts`  

```
src
 │
 ├─⊳ domain     
 ├─⊳ infrastructure
 │   └─⊳ cron-job       
 │       └─⊳ jobs
 │           └─⊳ schedule-job               // crie uma pasta para o job
 │               └─⊳ index.ts               // crie seu job
 ├─⊳ presentation
 └─⊳ application
 
```

# #

### 2° - Crie um job com uma arrow function: ###

Adicione um job:

```typescript

import { ExternalService } from '@services/outside/externals/external-service'
import cron from 'node-cron'
import { container } from 'tsyringe'

export default (() => {
  cron.schedule('*/1 * * * *', async () => {
    const externalService = container.resolve<ExternalService>('IExternalService')
    console.table({
      date: new Date().toISOString(),
      schedule_name: 'job_mailing',
      status: externalService.calling(),
    })
  })
})()


```

`index.ts'

Resultado:

```sh
$ npm run ms:watch

┌───────────────┬────────────────────────────┐
│    (index)    │           Values           │
├───────────────┼────────────────────────────┤
│     date      │ '2021-03-14T16:10:00.004Z' │
│ schedule_name │       'job_mailing'        │
│    status     │         'answered'         │
└───────────────┴────────────────────────────┘

```
