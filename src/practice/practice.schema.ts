import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PracticeDocument = Practice & Document;

@Schema()
export class Practice {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const PracticeSchema = SchemaFactory.createForClass(Practice);
