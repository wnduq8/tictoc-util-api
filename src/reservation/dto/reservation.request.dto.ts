import { PickType } from '@nestjs/swagger'
import { ReservationEntity } from '../../domain/reservation.entity'
import { IsDateString, IsNotEmpty } from 'class-validator'
import { RoomEntity } from '../../domain/room.entity'

export class CreateReservationDto extends PickType(ReservationEntity, [
  'name',
  'desc',
  'reservationDate',
  'startTime',
  'endTime',
  'roomId',
] as const) {}

export class ReservationByDateDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date
}

export class CreateRoomDto extends PickType(RoomEntity, [
  'name',
  'floor',
  'minHeadCount',
  'maxHeadCount',
  'displayOrder',
  'status',
] as const) {}

export class UpdateRoomDto extends PickType(RoomEntity, [
  'id',
  'name',
  'floor',
  'minHeadCount',
  'maxHeadCount',
  'displayOrder',
] as const) {}
