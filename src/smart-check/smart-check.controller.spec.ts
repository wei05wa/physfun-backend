import { Controller, Get, Post, Body } from '@nestjs/common';
import { SmartCheckService } from './smart-check.service';
import { CreateQuestionDto } from './dto/create-question.dto/create-question.dto';

@Controller('smart-check')
export class SmartCheckController {
  constructor(private readonly service: SmartCheckService) {}

  @Post('questions')
  async create(@Body() dto: CreateQuestionDto) {
    return this.service.createQuestion(dto);
  }

  @Get('questions')
  async findAll() {
    return this.service.findAllQuestions();
  }
}

