import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Practice, PracticeDocument } from './practice.schema';

@Injectable()
export class PracticeService {
  constructor(@InjectModel(Practice.name) private practiceModel: Model<PracticeDocument>) {}

  async create(title: string, description?: string, tags: string[] = []): Promise<Practice> {
    const practice = new this.practiceModel({ title, description, tags });
    return practice.save();
  }

  async findAll(): Promise<Practice[]> {
    return this.practiceModel.find();
  }
}
