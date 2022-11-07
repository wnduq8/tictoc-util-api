import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Repository, In } from 'typeorm'
import { UserEntity } from '../domain/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity> {
    try {
      return this.repository.findOneBy({ email })
    } catch (error) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async findOneById(id: number): Promise<UserEntity> {
    try {
      return this.repository.findOneBy({ id })
    } catch (error) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async save(data: object) {
    try {
      return await this.repository.save(data)
    } catch (error) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async upsert(data: object, key: string) {
    try {
      return await this.repository.upsert(data, [key])
    } catch (error) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async update(data: any, id) {
    try {
      await this.repository.createQueryBuilder().update(UserEntity).set(data).where('id = :id', { id }).execute()
    } catch (error) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async getReservationByUserId(userId: number, reservationPaging: any) {
    try {
      return this.repository
        .createQueryBuilder('u')
        .withDeleted()
        .leftJoin('u.Reservations', 'ur')
        .select(['ur', 'u.id', 'u.name', 'u.email', 'u.department', 'isAdmin', 'u.status'])
        .where('ur.id IN (:id)', { id: reservationPaging.map(({ id }) => id) })
        .orderBy('ur.reservationDate', 'DESC')
        .addOrderBy('ur.startTime', 'ASC')
        .addOrderBy('ur.id', 'DESC')
        .getOne()
    } catch (e) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }
}
