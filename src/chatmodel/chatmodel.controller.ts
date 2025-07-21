import { Controller, Post, Body } from '@nestjs/common';
import { ChatmodelService } from './chatmodel.service';

@Controller('chat')
export class ChatmodelController {
  constructor(private readonly  ChatModelService : ChatmodelService) {}

//Phyrai AI
 @Post()
  async PhyraichatMessage(@Body() body: { prompt: string; }) {
    const airesponse =  await this.ChatModelService.Phyraimodel(body.prompt);
    console.log("type of response" , typeof airesponse);
    return {
      content : airesponse,
      role : "assistant"
    }
  
  }


  //Basic AI
  @Post('basic')
  async createBasicMessage(@Body() body: { prompt: string; }) {
    return this.ChatModelService.MessageModelbasic(body.prompt);
  
  }


  //Intermediate AI
   @Post('intermediate')
 async createIntermediateMessage(@Body() body: { prompt: string; }) {
  return this.ChatModelService.MessageModelIntermediate(body.prompt);
 }


 //Pro AI
   @Post('professional')
 async createProfessionalMessage(@Body() body: { prompt: string; }) {
  return this.ChatModelService.MessageModelProfessional(body.prompt);
 }

}
