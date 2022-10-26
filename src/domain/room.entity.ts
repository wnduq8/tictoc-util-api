import { Entity, Column, OneToMany } from 'typeorm'
import { CommonEntity } from '../common/entities/common.entity'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ReservationEntity } from './reservation.entity'

@Entity('room', { schema: 'atictoc_DB' })
export class RoomEntity extends CommonEntity {
  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'name', length: 200 })
  name: string

  @IsString()
  @IsOptional()
  @Column('varchar', { name: 'floor', length: 30, nullable: true })
  floor?: string | null

  @IsNumber()
  @IsNotEmpty()
  @Column('int', { name: 'minHeadCount' })
  minHeadCount: number

  @IsNumber()
  @IsNotEmpty()
  @Column('int', { name: 'maxHeadCount' })
  maxHeadCount: number

  @IsNumber()
  @IsNotEmpty()
  @Column('int', { name: 'displayOrder', unique: true })
  displayOrder: number

  @IsString()
  @Column('varchar', { name: 'status', length: 5, default: 'N' })
  status: string

  @OneToMany(() => ReservationEntity, (reservation) => reservation.Room)
  Reservations: ReservationEntity[]
}
