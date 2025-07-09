import { Controller, Post, Body } from '@nestjs/common';
import { LearnLogService } from './learnlog.service';

@Controller('learnlog')
export class LearnLogController {
  constructor(private readonly learnLogService: LearnLogService) {}

  @Post()
  create(@Body() body: { userId: string; action: string }) {
    return this.learnLogService.create(body.userId, body.action);
  }
}
