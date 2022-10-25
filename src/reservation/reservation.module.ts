import { Module } from '@nestjs/common'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'
import { ReservationRepository } from './reservation.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationEntity } from '../domain/reservation.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
