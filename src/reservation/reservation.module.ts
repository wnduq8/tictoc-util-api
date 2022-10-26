import { Module } from '@nestjs/common'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'
import { ReservationRepository } from './reservation.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationEntity } from '../domain/reservation.entity'
import { UserEntity } from '../domain/user.entity'
import { UsersRepository } from '../users/users.repository'
import { RoomEntity } from '../domain/room.entity'
import { RoomsRepository } from './rooms.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity, UserEntity, RoomEntity])],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository, UsersRepository, RoomsRepository],
})
export class ReservationModule {}
