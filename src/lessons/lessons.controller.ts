import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  async create(@Body() body: {
    title: string;
    description?: string;
    tags?: string[];
    practices?: string[];
    lessonId?: string;
    image?: string;
    subLessons?: any[];
  }) {
    return this.lessonsService.create(
      body.title,
      body.description,
      body.tags,
      body.practices,
      body.lessonId,
      body.image,
      body.subLessons,
    );
  }

  @Get()
  async findAll() {
    return this.lessonsService.findAll();
  }

  @Get('summaries')
  async getLessonSummaries() {
    return this.lessonsService.getLessonSummaries();
  }

  @Put(':lessonId')
  async update(
    @Param('lessonId') lessonId: string,
    @Body() updateData: {
      title?: string;
      description?: string;
      tags?: string[];
      practices?: string[];
      image?: string;
      subLessons?: any[];
    },
  ) {
    return this.lessonsService.updateLessonByLessonId(lessonId, updateData);
  }
}

