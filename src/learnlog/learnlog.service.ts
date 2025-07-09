// src/learninglog/learninglog.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LearnLog, LearnLogDocument } from './learnlog.schema';

@Injectable()
export class LearnLogService {
  constructor(@InjectModel(LearnLog.name) private logModel: Model<LearnLogDocument>) {}

  async create(userId: string, action: string): Promise<LearnLog> {
    const log = new this.logModel({ userId, action });
    return log.save();
  }
}
