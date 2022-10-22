import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const statusCode = exception.getStatus()
    const errorCode = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] }

    if (typeof errorCode === 'string') {
      response.status(statusCode).json({
        statusCode,
        errorCode,
        timestamp: new Date().toISOString(),
        path: request.url,
      })
    } else {
      response.status(statusCode).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode: errorCode.statusCode,
        errorCode: errorCode.error,
        message: errorCode?.message,
      })
    }
  }
}

/**
 * use
 * throw new HttpException('errorCode ex enum', 'statusCode ex 401')
 *  */
