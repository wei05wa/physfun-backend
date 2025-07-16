import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question, QuestionDocument } from './schemas/question.schema';
import { UserAnswer, UserAnswerDocument } from './schemas/user-answer.schema';
import { Analysis, AnalysisDocument } from './schemas/analysis.schema';

@Injectable()
export class SmartCheckRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(UserAnswer.name) private userAnswerModel: Model<UserAnswerDocument>,
    @InjectModel(Analysis.name) private analysisModel: Model<AnalysisDocument>,
  ) {}

  // Question CRUD
  async createQuestion(data: Partial<Question>) {
    return this.questionModel.create(data);
  }

  async findAllQuestions() {
    return this.questionModel.find().exec();
  }

  async findQuestionById(id: string) {
    return this.questionModel.findById(id).exec();
  }

  // UserAnswer CRUD

  async findUserAnswersByUserId(userId: string) {
    return this.userAnswerModel.find({ userId }).exec();
  }

  // Analysis CRUD
  async createAnalysis(data: Partial<Analysis>) {
    return this.analysisModel.create(data);
  }

  async findAnalysisByUserAnswerId(userAnswerId: string) {
    return this.analysisModel.findOne({ userAnswerId }).exec();
  }

  async createUserAnswer(data: Partial<UserAnswer>) {
  return this.userAnswerModel.create(data);
}

}

