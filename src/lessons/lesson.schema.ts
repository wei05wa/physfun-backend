import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class SubLesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: 'content' }) // 'content' หรือ 'simulation'
  type: string;

  // สามารถเพิ่ม field อื่น ๆ ได้ เช่น video, image, quiz ฯลฯ
}

@Schema()
export class Lesson {
  @Prop({ required: true, unique: true })
  lessonId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  image?: string; // URL หรือ path ของรูปภาพประกอบบทเรียน

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [String], default: [] })
  practices: string[]; // รหัสหรือ id ของ practice ที่เกี่ยวข้อง

  @Prop({ type: [SubLesson], default: [] })
  subLessons: SubLesson[]; // รายการบทเรียนย่อย

  @Prop({ default: 'content' }) // 👉 default เป็น content ถ้าไม่ระบุ
  type: string;
}

export const SubLessonSchema = SchemaFactory.createForClass(SubLesson);
export const LessonSchema = SchemaFactory.createForClass(Lesson);
