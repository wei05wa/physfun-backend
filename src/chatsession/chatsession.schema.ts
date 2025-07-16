import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,  } from 'mongoose';
import { User, UserSchema } from 'src/users/user.schema';


//Define message Schema
@Schema({id: false, timestamps : true })
export class Message{

  @Prop({required : true})
  content : string;


    @Prop({required : true, default : 'user' , type : String,enum : ['user', 'ai']})
  sender : string;

  CreatedAt? : Date;
  UpdatedAt?: Date;

}

export const MessageChatSchema = SchemaFactory.createForClass(Message);


//Main Chat session Schema
export type ChatSessionDocument = ChatSession & Document;

@Schema({timestamps : true})
export class ChatSession {
 @Prop({unique:true,required:true})
  sessionId: string;

  @Prop({ type : UserSchema, ref : 'User', required : true})
  userId: User;

  @Prop({ type: [MessageChatSchema], default : []})
  messages: Message[];

}

export const ChatSessionSchema = SchemaFactory.createForClass(ChatSession);
