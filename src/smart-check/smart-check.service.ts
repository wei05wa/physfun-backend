
import { Injectable } from '@nestjs/common';
import { SmartCheckRepository } from './smart-check.repository';
import { CreateQuestionDto } from './dto/create-question.dto/create-question.dto';
import { UserAnswer } from './schemas/user-answer.schema';


@Injectable()
export class SmartCheckService {
  constructor(private readonly repo: SmartCheckRepository) {}

  async createQuestion(dto: CreateQuestionDto) {
    return this.repo.createQuestion(dto);
  }

  async findAllQuestions() {
    return this.repo.findAllQuestions();
  }

  async submitUserAnswer(data: Partial<UserAnswer>) {
  return this.repo.createUserAnswer(data);
}
}


