import { PickType } from '@nestjs/swagger'
import { ReservationEntity } from '../../domain/reservation.entity'

export class CreateReservationDto extends PickType(ReservationEntity, [
  'name',
  'desc',
  'reservationDate',
  'startTime',
  'endTime',
  'roomId',
] as const) {}
