import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Payload } from './jwt.payload'
import { UsersRepository } from '../../users/users.repository'
import { ExceptionCode } from '../../common/constants/exception'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    })
  }

  async validate(payload: Payload) {
    try {
      const { password, ...user } = await this.usersRepository.findOneById(payload.id)

      if (user) {
        return user
      } else {
        throw new UnauthorizedException(ExceptionCode.invalidJwtToken)
      }
    } catch (e) {
      throw new UnauthorizedException(ExceptionCode.invalidJwtToken)
    }
  }
}
