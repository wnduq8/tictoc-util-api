import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter'
import { SuccessInterceptor } from './common/interceptors/success.interceptor'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new SuccessInterceptor())

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
  await app.listen(8080)
}

bootstrap()
