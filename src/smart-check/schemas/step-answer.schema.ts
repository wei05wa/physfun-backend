import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StepAnswerDocument = StepAnswer & Document;

@Schema({ _id: false }) // ไม่ต้องสร้าง _id แยกให้กับ subdocument
export class StepAnswer {
  @Prop({ required: true })
  step: number;

  @Prop({ required: true })
  answer: string;

  @Prop()
  confidenceLevel?: number; // optional: ความมั่นใจของผู้ใช้
}

export const StepAnswerSchema = SchemaFactory.createForClass(StepAnswer);
