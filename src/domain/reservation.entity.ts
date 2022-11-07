import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { CommonEntity } from '../common/entities/common.entity'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { UserEntity } from './user.entity'
import { RoomEntity } from './room.entity'

@Entity('reservation', { schema: 'atictoc_DB' })
export class ReservationEntity extends CommonEntity {
  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'name', length: 100 })
  name: string

  @IsString()
  @IsOptional()
  @Column('text', { name: 'desc', nullable: true })
  desc?: string | null

  @IsString()
  @IsNotEmpty()
  @Column('date', { name: 'reservationDate' })
  reservationDate: string

  @IsString()
  @IsNotEmpty()
  @Column('time', { name: 'startTime' })
  startTime: string

  @IsString()
  @IsNotEmpty()
  @Column('time', { name: 'endTime' })
  endTime: string

  @IsNumber()
  @IsNotEmpty()
  @Column('bigint', { name: 'userId' })
  userId: number

  @IsNumber()
  @IsNotEmpty()
  @Column('bigint', { name: 'roomId' })
  roomId: number

  @ManyToOne(() => UserEntity, (user) => user.Reservations, {
    cascade: true,
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  User: UserEntity

  @ManyToOne(() => RoomEntity, (room) => room.Reservations, {
    cascade: true,
  })
  @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
  Room: RoomEntity
}
