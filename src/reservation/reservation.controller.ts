import { Body, Controller, Delete, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { jwtAuthGuard } from '../auth/jwt/jwt.guard'
import { CreateReservationDto } from './dto/reservation.request.dto'

@UseGuards(jwtAuthGuard)
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(@Req() req, @Body() body: CreateReservationDto) {
    return await this.reservationService.createReservation(body, req.user.id)
  }

  @Delete(':id')
  async deleteReservation(@Req() req, @Param('id', ParseIntPipe) id) {
    const userId = parseInt(req.user.id, 10)
    return await this.reservationService.deleteReservation(userId, id)
  }
}
