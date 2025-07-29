import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();  // <-- เดี๋ยวมาใส่ในอนาคต  พวกลิ้งเว็บ
    app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());



  await app.listen(process.env.PORT ?? 3001);
  console.log("server running on port", process.env.PORT ?? 3001)
}
bootstrap();
