// src/smart-check/schemas/analysis.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnalysisDocument = Analysis & Document;

@Schema({ timestamps: true })
export class Analysis {
  @Prop({ required: true, type: Types.ObjectId, ref: 'UserAnswer' })
  userAnswerId: Types.ObjectId;

  @Prop({ required: true })
  misconceptions: string[]; // รายการข้อผิดพลาดที่พบ

  @Prop()
  recommendations: string[]; // คำแนะนำปรับปรุง

  @Prop()
  confidenceLevel?: number; // ความมั่นใจของผลวิเคราะห์ (0-1)
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);
