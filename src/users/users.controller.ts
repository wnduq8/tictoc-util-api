import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { AdditionalInfoSignUpDto, EmailSignUpDto } from './dto/users.request.dto'
import { GoogleLoginRequestDto, LoginRequestDto } from '../auth/dto/login.request.dto'
import { CurrentUserResponseDto } from './dto/users.response.dto'
import { AuthService } from '../auth/auth.service'
import { jwtAuthGuard } from '../auth/jwt/jwt.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @UseGuards(jwtAuthGuard)
  @Get('user')
  async getCurrentUser(@CurrentUser() currentUser: CurrentUserResponseDto) {
    return currentUser
  }

  @Post('signup/email')
  async emailSignUp(@Body() body: EmailSignUpDto) {
    return this.usersService.registerEmailUser(body)
  }

  @Post('signin/email')
  async emailLogin(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body)
  }

  @Post('signin/google')
  async googleLogin(@Body() { credential }: GoogleLoginRequestDto) {
    const { email, isGoogle } = await this.usersService.registerGoogleUser(credential)
    return this.authService.jwtLogIn({ email, isGoogle })
  }

  @UseGuards(jwtAuthGuard)
  @Post('signup/additional-info')
  async additionalInfo(@Body() body: AdditionalInfoSignUpDto) {
    return await this.usersService.additionalRegisterUser(body)
  }
}
