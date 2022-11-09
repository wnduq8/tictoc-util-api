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

  async checkExistInvalid(data: CreateReservationDto): Promise<boolean> {
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

  async getReservationByDate(date) {
    try {
      return this.repository
        .createQueryBuilder('r')
        .innerJoin('r.User', 'ru')
        .innerJoin('r.Room', 'rr')
        .select([
          'r',
          'rr',
          'ru.id',
          'ru.name',
          'ru.deletedAt',
          'ru.email',
          'ru.phone',
          'ru.department',
          'ru.status',
          'ru.profileImage',
        ])
        .where('r.reservationDate = :date', { date })
        .orderBy('r.startTime', 'ASC')
        .getMany()
    } catch (e) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async getReservationPaging(userId: number, offset: number, limit: number) {
    try {
      return this.repository
        .createQueryBuilder('r')
        .withDeleted()
        .where('r.userId = :id', { id: userId })
        .orderBy('r.reservationDate', 'DESC')
        .addOrderBy('r.startTime', 'ASC')
        .addOrderBy('r.id', 'DESC')
        .skip(offset)
        .take(limit)
        .getMany()
    } catch (e) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async getAllReservationByUserId(id, offset, limit) {
    try {
      return this.repository
        .createQueryBuilder('r')
        .withDeleted()
        .innerJoin('r.Room', 'rr')
        .where('r.userId = :id', { id })
        .select(['r', 'rr'])
        .orderBy('r.reservationDate', 'DESC')
        .addOrderBy('r.startTime', 'ASC')
        .addOrderBy('r.id', 'DESC')
        .take(limit)
        .skip(offset)
        .getMany()
    } catch (e) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async getAllCountReservationByUserId(userId: number) {
    try {
      return this.repository.createQueryBuilder('r').withDeleted().where('userId = :userId', { userId }).getCount()
    } catch (e) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }
}
