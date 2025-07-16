import { Controller, Get, Post, Body } from '@nestjs/common';
import { SmartCheckService } from './smart-check.service';
import { CreateQuestionDto } from './dto/create-question.dto/create-question.dto';
import { SubmitUserAnswerDto } from './dto/submit-answer.dto/submit-answer.dto';

@Controller('smart-check')
export class SmartCheckController {
  constructor(private readonly smartCheckService: SmartCheckService) {}

  @Get('questions')
  getAllQuestions() {
    return this.smartCheckService.findAllQuestions();
  }

  @Post('questions')
  createQuestion(@Body() dto: CreateQuestionDto) {
    return this.smartCheckService.createQuestion(dto);
  }

  @Post('submit-answer')
submitAnswer(@Body() dto: SubmitUserAnswerDto) {
  return this.smartCheckService.submitUserAnswer(dto);
}

}



