import { PickType } from '@nestjs/swagger'
import { UserEntity } from '../../domain/user.entity'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class LoginRequestDto extends PickType(UserEntity, ['email', 'password'] as const) {
  @IsBoolean()
  @IsNotEmpty()
  isGoogle: boolean
}

export class GoogleLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  credential: string
}
