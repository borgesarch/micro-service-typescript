import i18n from 'i18n'
import Base from '../../base/base-model'
import { Md5 } from 'md5-typescript'
import { Entity, Column, BeforeInsert, BeforeUpdate, AfterInsert } from 'typeorm'
import { IsNotEmpty, IsBoolean, IsEmail, validate, ValidationError } from 'class-validator'
import { Repository } from 'src/infrastructure/data/entities/decorators/entity-repository-decorator'

@Repository()
@Entity({ name: 'users' })
export class User extends Base {
  @IsEmail()
  @IsNotEmpty({
    message: i18n.__('user.email.error.isnotnull'),
  })
  @Column()
  public email: string

  @IsNotEmpty({
    message: i18n.__('user.password.error.invalid'),
  })
  @Column()
  public password: string

  @IsBoolean()
  @Column()
  public active: boolean

  @BeforeUpdate()
  beforeUpdate () {
    this.updated_at = new Date().toISOString()
  }

  @AfterInsert()
  afterInsert () {
  }

  @BeforeInsert()
  async beforeInsert () {
    this.created_at = new Date().toISOString()
  }

  async encryptPassword () {
    this.password = Md5.init(this.password)
  }

  async validate () : Promise<ValidationError[]> {
    return await validate(this)
  }
}
