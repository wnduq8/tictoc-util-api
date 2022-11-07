import { Transform } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class CommonResponseDto {
  statusCode: number
  timestamp: Date
}

export class PagingQuery {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  offset: number

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  limit: number
}
