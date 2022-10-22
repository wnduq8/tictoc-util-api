import { CommonResponseDto } from '../../common/dto/response.dto'
import { Payload } from '../../auth/jwt/jwt.payload'
import { CommonEntity } from '../../common/entities/common.entity'

export class EmailLoginResponseDto extends CommonResponseDto {
  data: { token: string }
}

export class CurrentUserResponseDto extends CommonResponseDto {
  data: Payload & CommonEntity
}
