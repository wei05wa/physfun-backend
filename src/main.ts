import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
 origin :  'http://localhost:3001',
    credentials : true
  });  // <-- ใส่ตรงนี้
    app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());



  await app.listen(process.env.PORT ?? 3001);
  console.log("server running on port", process.env.PORT ?? 3001)
}
bootstrap();
