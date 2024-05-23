import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const config = new DocumentBuilder().setTitle('Hotel-App BackEnd').setDescription('Documentación respectiva al backend generado para el proyecto Hotel-App desarrollado como parte del curso Ingeniería de Software II.').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('backend-documentation', app, document);
  await app.listen(3001);
}
bootstrap();
