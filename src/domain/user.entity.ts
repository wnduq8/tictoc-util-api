import { Entity, Column } from 'typeorm'
import { CommonEntity } from '../common/entities/common.entity'
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@Entity('user', { schema: 'atictoc_DB' })
export class UserEntity extends CommonEntity {
  @IsEmail()
  @IsNotEmpty()
  @Column('varchar', { name: 'email', length: 100, unique: true })
  email: string

  @IsString()
  @IsOptional()
  @Column('varchar', { nullable: true })
  password?: string | null

  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'name', length: 45 })
  name: string

  @IsString()
  @IsOptional()
  @Column('varchar', { name: 'phone', length: 20, nullable: true, unique: true })
  phone?: string | null

  @IsString()
  @IsOptional()
  @Column('varchar', { name: 'department', nullable: true, length: 45 })
  department?: string | null

  @IsString()
  @IsOptional()
  @Column('varchar', { name: 'profile_image', nullable: true, length: 200 })
  profileImage?: string | null

  @IsBoolean()
  @IsOptional()
  @Column('boolean', { default: false })
  isGoogle: boolean

  @IsBoolean()
  @IsOptional()
  @Column('boolean', { default: false })
  isAdmin: boolean

  @Column('varchar', { name: 'status', length: 5, default: 'N' })
  status: string
}
