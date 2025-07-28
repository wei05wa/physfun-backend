import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LessonsModule } from './lessons/lessons.module';
import { ChatmodelModule} from './chatmodel/chatmodel.module'
import {UsersModule} from './users/users.module';
import { SmartCheckModule } from './smart-check/smart-check.module';


@Module({
  imports: [
    ConfigModule.forRoot( {isGlobal: true, envFilePath: '.env'} ),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    LessonsModule,
    UsersModule,
    ChatmodelModule,
    SmartCheckModule
  ],
})


export class AppModule {
  constructor() {
    console.log('Mongo URI:', process.env.MONGO_URI);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
  }
}
