import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomEntity } from '../domain/room.entity'
import { UpdateRoomDto } from './dto/reservation.request.dto'

@Injectable()
export class RoomsRepository {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly repository: Repository<RoomEntity>,
  ) {}

  async findOneById(id: number): Promise<RoomEntity> {
    try {
      return this.repository.findOneBy({ id })
    } catch (error) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async getAll() {
    try {
      return this.repository.find({
        where: {
          status: 'A',
        },
        order: {
          displayOrder: 'ASC',
        },
      })
    } catch (e) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async save(room: RoomEntity): Promise<RoomEntity> {
    try {
      return await this.repository.save(room)
    } catch (error) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }

  async update(room: UpdateRoomDto): Promise<UpdateResult> {
    try {
      return await this.repository
        .createQueryBuilder()
        .update(RoomEntity)
        .set({
          name: room.name,
          floor: room.floor,
          minHeadCount: room.minHeadCount,
          maxHeadCount: room.maxHeadCount,
          displayOrder: room.displayOrder,
        })
        .where('id = :id', { id: room.id })
        .execute()
    } catch (e) {
      throw new InternalServerErrorException('A database query error has occurred.')
    }
  }
}
