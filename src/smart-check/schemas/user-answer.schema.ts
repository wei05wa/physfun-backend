import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserAnswerDocument = UserAnswer & Document;

@Schema({ timestamps: true })
export class UserAnswer {
  @Prop({ required: true })
  userId: string; // หรืออาจใช้ชื่อเล่นก็ได้ถ้ายังไม่มีระบบ auth

  @Prop({ required: true })
  questionId: string;

  @Prop()
  selectedDiagramId?: string;

  @Prop({ type: Object }) // เช่น { symbol: "m", value: 5, ... }
  variables?: any[];

  @Prop({ type: Object }) // เช่น [{ description: "", expression: "" }]
  calculationSteps?: any[];

  @Prop({ type: Object }) // เช่น { value: 4, unit: 'm/s²' }
  finalAnswer?: any;
}

export const UserAnswerSchema = SchemaFactory.createForClass(UserAnswer);

