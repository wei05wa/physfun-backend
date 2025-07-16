import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false }) // เป็น sub-document
export class QuestionStep {
  @Prop({ required: true })
  step: number; // เช่น 1, 2, 3

  @Prop({ required: true })
  type: 'variable' | 'calculation' | 'fbd'; // ประเภท step

  @Prop()
  expectedAnswer: string; // เฉลยของ step นี้ (ใช้ string ก่อนเพื่อความยืดหยุ่น)

  @Prop()
  explanation?: string; // คำอธิบายเพิ่มเติม
}

export const QuestionStepSchema = SchemaFactory.createForClass(QuestionStep);
