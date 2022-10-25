import { CommonResponseDto } from '../../common/dto/response.dto'
import { Payload } from '../../auth/jwt/jwt.payload'
import { CommonEntity } from '../../common/entities/common.entity'

export class ReservationDto3 extends CommonResponseDto {
  data: { token: string }
}

export class ReservationDto4 extends CommonResponseDto {
  data: Payload & CommonEntity
}
