import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { ExceptionCode } from '../constants/exception'

@Injectable()
export class OnlyAdminInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    if (user && user.isAdmin) {
      return next.handle().pipe(map((data) => data))
    } else {
      throw new UnauthorizedException(ExceptionCode.invalidJwtToken)
    }
  }
}
