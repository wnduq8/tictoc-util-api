import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { jwtAuthGuard } from '../auth/jwt/jwt.guard'
import { CreateReservationDto, CreateRoomDto, ReservationByDateDto, UpdateRoomDto } from './dto/reservation.request.dto'
import { OnlyAdminInterceptor } from '../common/interceptors/only-admin.interceptor'
import { PagingQuery } from '../common/dto/response.dto'

@UseGuards(jwtAuthGuard)
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('user')
  async getReservationByUser(@Req() req, @Query() query: PagingQuery) {
    const { offset = 0, limit = 20 } = query
    const convertOffset = offset > 0 ? offset - 1 : offset
    return await this.reservationService.getReservationByUser(req.user.id, convertOffset, limit)
  }

  @Get('rooms')
  async getReservationRooms() {
    return await this.reservationService.getReservationRooms()
  }

  // 어드민
  @UseInterceptors(OnlyAdminInterceptor)
  @Get('admin/rooms')
  async getAdminReservationRooms() {
    return await this.reservationService.getAdminReservationRooms()
  }

  // 어드민
  @UseInterceptors(OnlyAdminInterceptor)
  @Get('admin/user/reservation/:id')
  async getAdminReservationByUser(@Param('id', ParseIntPipe) id, @Query() query: PagingQuery) {
    const { offset = 0, limit = 20 } = query
    const convertOffset = offset > 0 ? offset - 1 : offset
    return await this.reservationService.getAdminReservationByUser(id, convertOffset, limit)
  }

  // 어드민
  @UseInterceptors(OnlyAdminInterceptor)
  @Post('admin/room')
  async createRoom(@Body() body: CreateRoomDto) {
    return await this.reservationService.createRoom(body)
  }

  // 어드민
  @UseInterceptors(OnlyAdminInterceptor)
  @Patch('admin/room')
  async updateRoom(@Body() body: UpdateRoomDto) {
    return await this.reservationService.updateRoom(body)
  }

  @Post('date')
  async getReservationByDate(@Body() body: ReservationByDateDto) {
    return await this.reservationService.getReservationByDate(body.date)
  }

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
