import { PickType } from '@nestjs/swagger'
import { UserEntity } from '../../domain/user.entity'
import { IsNotEmpty, IsString } from 'class-validator'

export class EmailSignUpDto extends PickType(UserEntity, [
  'email',
  'name',
  'phone',
  'department',
  'profileImage',
] as const) {
  @IsString()
  @IsNotEmpty()
  password: string
}

export class AdditionalInfoSignUpDto extends PickType(UserEntity, ['id', 'name', 'phone'] as const) {
  @IsString()
  @IsNotEmpty()
  department: string
}
