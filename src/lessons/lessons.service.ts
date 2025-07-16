import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from './lesson.schema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
  ) {}

  async create(
    title: string,
    description?: string,
    tags: string[] = [],
    practices: string[] = [],
    lessonId?: string,
    image?: string,
    subLessons: any[] = [],
  ): Promise<Lesson> {
    const lesson = new this.lessonModel({
      lessonId,
      title,
      description,
      tags,
      practices,
      image,
      subLessons,
    });
    return lesson.save();
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find();
  }

  async getLessonSummaries(): Promise<
    { lessonId: string; title: string; image?: string }[]
  > {
    return this.lessonModel.find({}, { lessonId: 1, title: 1, image: 1, type:1, _id: 0 });
  }

  async updateLessonByLessonId(
    lessonId: string,
    updateData: Partial<Lesson>,
  ): Promise<Lesson> {
    // 🔥 ลบ lessonId ออกจาก updateData เพื่อป้องกัน error
    const { lessonId: _, ...rest } = updateData;

    const updated = await this.lessonModel.findOneAndUpdate(
      { lessonId },
      rest,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException(`Lesson with lessonId "${lessonId}" not found.`);
    }

    return updated;
  }

  async bulkUpdateTypes(updates: { lessonId: string; type: string }[]) {
    const results: { lessonId: string; updated: boolean }[] = [];

    for (const update of updates) {
      const res = await this.lessonModel.updateOne(
        { lessonId: update.lessonId },
        { $set: { type: update.type } }
      );
      results.push({ lessonId: update.lessonId, updated: res.modifiedCount > 0 });
    }

    return results;
  }
}



