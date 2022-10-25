import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm'
import { CommonEntity } from '../common/entities/common.entity'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { UserEntity } from './user.entity'
import { RoomEntity } from './room.entity'

@Index('userId', ['userId'], {})
@Entity('reservation', { schema: 'atictoc_DB' })
export class ReservationEntity extends CommonEntity {
  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'name', length: 200 })
  name: string

  @IsString()
  @IsOptional()
  @Column('text', { name: 'desc', nullable: true })
  desc?: string | null

  @IsString()
  @IsNotEmpty()
  @Column('date', { name: 'reservation_date' })
  reservationDate: string

  @IsString()
  @IsNotEmpty()
  @Column('time', { name: 'start_time' })
  startTime: string

  @IsString()
  @IsNotEmpty()
  @Column('time', { name: 'end_time' })
  endTime: string

  @Column('bigint', { name: 'userId' })
  userId: number

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
