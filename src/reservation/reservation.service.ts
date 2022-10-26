import { HttpException, Injectable } from '@nestjs/common'
import { CreateReservationDto } from './dto/reservation.request.dto'
import { ReservationRepository } from './reservation.repository'
import { ReservationEntity } from '../domain/reservation.entity'
import { ExceptionCode } from '../common/constants/exception'
import { format, utcToZonedTime } from 'date-fns-tz'
import { subMinutes } from 'date-fns'
import { timeZone } from '../common/constants/date'
import { UsersRepository } from '../users/users.repository'

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async createReservation(data: CreateReservationDto, userId: number) {
    const now = format(utcToZonedTime(new Date(), timeZone), 'yyyy-MM-dd HH:mm:SS')
    if (new Date(`${data.reservationDate} ${data.startTime}`).getTime() < new Date(now).getTime()) {
      throw new HttpException(ExceptionCode.reservationInvalidCreateTime, 403)
    }

    const isInvalid = await this.reservationRepository.checkCreateInvalid(data)

    if (isInvalid) {
      throw new HttpException(ExceptionCode.reservationInvalidCreateExist, 403)
    }

    return this.saveReservation(data, userId)
  }

  private async saveReservation(data: CreateReservationDto, userId: number) {
    const reservation = new ReservationEntity()
    reservation.name = data.name
    reservation.desc = data.desc
    reservation.reservationDate = data.reservationDate
    reservation.startTime = data.startTime
    reservation.endTime = data.endTime
    reservation.userId = userId
    reservation.roomId = data.roomId
    return this.reservationRepository.save(reservation)
  }

  async deleteReservation(userId: number, reservationId: number) {
    const reservation = await this.reservationRepository.findOneById(reservationId)

    if (!reservation || reservation.userId != userId) {
      throw new HttpException(ExceptionCode.reservationInvalidDelete, 403)
    }

    const now = format(utcToZonedTime(new Date(), timeZone), 'yyyy-MM-dd HH:mm:SS')
    const subDate = format(
      subMinutes(new Date(`${reservation.reservationDate} ${reservation.startTime}`), 10),
      'yyyy-MM-dd HH:mm:SS',
    )

    if (new Date(now).getTime() > new Date(subDate).getTime()) {
      throw new HttpException(ExceptionCode.reservationInvalidDeleteTime, 403)
    }

    return await this.reservationRepository.softDelete(reservationId)
  }

  async getReservationByDate(date: Date) {
    const onlyDate = format(utcToZonedTime(new Date(date), timeZone), 'yyyy-MM-dd')
    return await this.reservationRepository.getReservationByDate(onlyDate)
  }

  async getReservationByUser(userId: number) {
    return await this.userRepository.getReservationByUserId(userId)
  }
}
