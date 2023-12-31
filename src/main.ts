import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { ResponseInterseptor } from './common/interseptors/response.interseptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterseptor());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Nest test-task docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3100, () => {
    console.log('Api started on port: ' + process.env.PORT ?? 3100);
  });
}
bootstrap();
