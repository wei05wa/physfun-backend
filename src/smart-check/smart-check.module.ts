import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SmartCheckController } from './smart-check.controller';
import { SmartCheckService } from './smart-check.service';
import { AnalysisService } from './logic/analysis/analysis.service';
import { MisconceptionService } from './logic/misconception/misconception.service';
import { RecommendationService } from './logic/recommendation/recommendation.service';

import { Question, QuestionSchema } from './schemas/question.schema';
import { UserAnswer, UserAnswerSchema } from './schemas/user-answer.schema';
import { Analysis, AnalysisSchema } from './schemas/analysis.schema';
import { SmartCheckRepository } from './smart-check.repository'; 

import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: UserAnswer.name, schema: UserAnswerSchema },
      { name: Analysis.name, schema: AnalysisSchema },
    ]),
  ],
  controllers: [SmartCheckController],
  providers: [
    SmartCheckService,
    AnalysisService,
    MisconceptionService,
    RecommendationService,
    SmartCheckRepository,
  ],
})
export class SmartCheckModule {}


