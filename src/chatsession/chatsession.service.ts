
import { Injectable } from '@nestjs/common';
import {InjectModel }from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatSessionDocument, ChatSession } from './chatsession.schema';


@Injectable()
export class ChatSessionService {

 constructor(@InjectModel(ChatSession.name) private ChatSessionModel: Model<ChatSessionDocument>) {}

  async createSession(session_ID: string, user_ID: string, allmessages: any[]): Promise<ChatSession> {
    const SESSION = new this.ChatSessionModel({sessionId : session_ID, userId:user_ID , messages : allmessages});
    return SESSION.save();
  }

  async findSessionBySessionId(sessionId : string) : Promise<ChatSession|null> {
    return this.ChatSessionModel.findById(sessionId);
  }

 async findSessionByUserId(userId : string) : Promise<ChatSession|null> {
    return this.ChatSessionModel.findById(userId);
  }


}