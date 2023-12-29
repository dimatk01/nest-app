import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { ResponseInterseptor } from './common/interseptors/response.interseptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterseptor())
  app.enableCors()
  await app.listen(process.env.API_PORT ?? 3100, () => {
    console.log('Api started on port: ' + process.env.API_PORT ?? 3100)
  })
}
bootstrap();
