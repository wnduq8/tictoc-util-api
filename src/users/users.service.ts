import { HttpException, Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { AdditionalInfoSignUpDto, EmailSignUpDto } from './dto/users.request.dto'
import { ExceptionCode } from '../common/constants/exception'
import * as bcrypt from 'bcrypt'
import jwtDecode from 'jwt-decode'
import { UserEntity } from '../domain/user.entity'
import { validate } from '../utils/validate'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerEmailUser(emailSignUpDto: EmailSignUpDto) {
    const { email, password } = emailSignUpDto
    const user = await this.usersRepository.findOneByEmail(email)
    if (user) {
      throw new HttpException(ExceptionCode.invalidUserInfo, 403)
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    await this.usersRepository.save({
      ...emailSignUpDto,
      password: hashedPassword,
    })
  }

  async registerGoogleUser(credential: string) {
    const profile: any = jwtDecode(credential)

    if (!profile || validate.tictocEmail(profile.email) === false) {
      throw new HttpException(ExceptionCode.invalidUserInfo, 403)
    }

    const user = await this.usersRepository.findOneByEmail(profile.email)
    if (user) {
      return user
    }

    const newUser = new UserEntity()
    newUser.email = profile.email
    newUser.name = profile.name
    newUser.profileImage = profile.picture || null
    newUser.isGoogle = true

    return await this.usersRepository.save(newUser)
  }

  async additionalRegisterUser(body: AdditionalInfoSignUpDto) {
    const { id } = body
    const user = await this.usersRepository.findOneById(id)
    if (!user) {
      throw new HttpException(ExceptionCode.invalidUserInfo, 403)
    }
    const updateInfo = {
      name: body.name,
      phone: body.phone,
      department: body.department,
      status: 'A',
    }

    return await this.usersRepository.update(updateInfo, user.id)
  }

  async getUsers(offset: number, limit: number) {
    const data = await this.usersRepository.getUsersInfo(offset, limit)
    const totalCount = await this.usersRepository.getAllUserCount()
    return {
      totalCount,
      data,
    }
  }
}
