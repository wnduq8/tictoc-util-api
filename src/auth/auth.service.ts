import { HttpException, Injectable } from '@nestjs/common'
import { UsersRepository } from '../users/users.repository'
import { JwtService } from '@nestjs/jwt'
import { ExceptionCode } from '../common/constants/exception'
import * as bcrypt from 'bcrypt'
import { LoginRequestDto } from './dto/login.request.dto'
import { Payload } from './jwt/jwt.payload'

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository, private readonly jwtService: JwtService) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password, isGoogle } = data

    const user = await this.usersRepository.findOneByEmail(email)

    if (!user) {
      throw new HttpException(ExceptionCode.invalidUserInfo, 403)
    }

    if (!isGoogle) {
      if (!user.password) {
        throw new HttpException(ExceptionCode.badRequest, 400)
      }

      const isPasswordValidated: boolean = await bcrypt.compare(password, user.password)

      if (!isPasswordValidated) {
        throw new HttpException(ExceptionCode.invalidUserInfo, 403)
      }
    }

    const payload: Payload = {
      email,
      id: user.id,
      name: user.name,
      department: user.department,
      profileImage: user.profileImage,
      isAdmin: user.isAdmin,
      isGoogle: user.isGoogle,
      status: user.status,
    }

    return {
      token: this.jwtService.sign(payload),
    }
  }
}
