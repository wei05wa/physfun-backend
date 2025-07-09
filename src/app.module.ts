import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    LessonsModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('Mongo URI:', process.env.MONGO_URI);
  }
}
