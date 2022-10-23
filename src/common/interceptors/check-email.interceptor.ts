import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { validate } from '../../utils/validate'
import { ExceptionCode } from '../constants/exception'

@Injectable()
export class CheckEmailInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { email } = context.switchToHttp().getRequest().body
    if (!email || validate.tictocEmail(email) === false) {
      throw new HttpException(ExceptionCode.invalidUserInfo, 403)
    }

    return next.handle()
  }
}
