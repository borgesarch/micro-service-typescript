# Migrations #


### 1° Criando uma nova migration ###

Em seu terminal execute:

```sh
$ ms:migration:create CreateUserTable
```


 Navegue até a pasta infrastructure/data/migrations  

```
src
 │
 ├─⊳ domain
 ├─⊳ infrastructure
 │   └─⊳ data       
 │       └─⊳ migrations
 │           └─⊳ 1604202247332-CreateUserTable.ts.ts           // migration gerada
 ├─⊳ presentation
 └─⊳ application
 
```

# #

### 2° - Preencha sua migration com os campos de sua necessidade ###

Adicione as propriedades pertinentes ao seu domínio de negócio:

```typescript

import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreateUserTable1604202247332 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
          },
        ],
      }),
      true,
    )

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_ID',
        columnNames: ['id'],
      }),
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}


```


### 3° SINCRONIZE O BANCO ###

Em seu terminal execute:

```sh
$ ms:migration:run
```