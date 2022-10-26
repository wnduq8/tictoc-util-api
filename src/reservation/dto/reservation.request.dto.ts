import { PickType } from '@nestjs/swagger'
import { ReservationEntity } from '../../domain/reservation.entity'
import { IsDate, IsDateString, IsNotEmpty } from 'class-validator'

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
