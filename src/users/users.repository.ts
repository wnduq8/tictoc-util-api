import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Repository } from 'typeorm'
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
}
