import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FbdOption {
  @Prop({ required: true })
  id: string;           // เช่น 'a', 'b', 'c'

  @Prop({ required: true })
  description: string;  // คำอธิบายภาพ

  @Prop({ required: true })
  image: string;        // URL หรือโค้ดรูปภาพ
}

export const FbdOptionSchema = SchemaFactory.createForClass(FbdOption);
