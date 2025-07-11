import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();  // <-- ใส่ตรงนี้

  await app.listen(process.env.PORT ?? 3001);
  console.log("server running on port", process.env.PORT ?? 3001)
}
bootstrap();
