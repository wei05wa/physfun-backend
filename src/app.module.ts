import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LessonsModule } from './lessons/lessons.module';
import { ChatmodelModule} from './chatmodel/chatmodel.module'
import {UsersModule} from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    LessonsModule,
    ChatmodelModule,
    UsersModule
  ],
})


export class AppModule {
  constructor() {
    console.log('Mongo URI:', process.env.MONGO_URI);
    console.log('JWT_SECRET: ', process.env.JWT_SECRET);
  }
}
