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
    origin: 'https://tictoc-util-front.vercel.app',
    credentials: true,
  })
  await app.listen(process.env.PORT)
}

bootstrap()
