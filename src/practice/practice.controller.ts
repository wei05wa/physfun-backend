import { Controller, Post, Body, Get } from '@nestjs/common';
import { PracticeService } from './practice.service';

@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  async create(@Body() body: { title: string; description?: string; tags?: string[] }) {
    return this.practiceService.create(body.title, body.description, body.tags);
  }

  @Get()
  async findAll() {
    return this.practiceService.findAll();
  }
}
