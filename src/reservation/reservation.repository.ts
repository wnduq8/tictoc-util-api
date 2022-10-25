import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ReservationEntity } from '../domain/reservation.entity'
import { CreateReservationDto } from './dto/reservation.request.dto'

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly repository: Repository<ReservationEntity>,
  ) {}

  async checkCreateInvalid(data: CreateReservationDto): Promise<boolean> {
    // 해당 시간에 이미 예약이 있는 경우
    try {
      const count = await this.repository
        .createQueryBuilder('r')
        .where('r.reservationDate = :reservationDate AND r.startTime < :endTime AND r.endTime > :startTime', {
          reservationDate: data.reservationDate,
          endTime: data.endTime,
          startTime: data.startTime,
        })
        .andWhere('r.roomId = :roomId', {
          roomId: data.roomId,
        })
        .getCount()

      return count > 0
    } catch (e) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async save(data: object): Promise<ReservationEntity> {
    try {
      return await this.repository.save(data)
    } catch (error) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async findOneById(id: number): Promise<ReservationEntity> {
    try {
      return this.repository.findOneBy({ id })
    } catch (error) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async softDelete(id: number) {
    try {
      await this.repository.softDelete(id)
    } catch (e) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }
}
