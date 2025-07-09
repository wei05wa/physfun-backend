// src/learnlog/learnlog.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LearnLogDocument = LearnLog & Document;

@Schema()
export class LearnLog {
  @Prop()
  userId: string;

  @Prop()
  action: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const LearnLogSchema = SchemaFactory.createForClass(LearnLog);
