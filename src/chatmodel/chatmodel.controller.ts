import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException, ParseFilePipe,
  MaxFileSizeValidator,Logger, FileTypeValidator, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatmodelService } from './chatmodel.service';

@Controller('chat')
export class ChatmodelController {
   private readonly logger = new Logger(ChatmodelController.name);

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

//OCR + AI Deepseek in the future
//  @Post('ocr')
//    @UseInterceptors(FileInterceptor('file', {
//     fileFilter: (req, file, cb) => {
//       // Allow images and PDFs
//       const allowedMimes = [
//         'image/jpeg', 
//         'image/jpg', 
//         'image/png', 
//         'image/gif', 
//         'image/webp', 
//         'application/pdf'
//       ];
      
//       if (allowedMimes.includes(file.mimetype)) {
//         cb(null, true);
//       } else {
//         cb(new BadRequestException('Only image files (JPEG, PNG, GIF, WebP) and PDF files are allowed'), false);
//       }
//     },
//     limits: {
//       fileSize: 10 * 1024 * 1024, // 10MB limit
//     },
//   }))
//   async processOCR(
//     @UploadedFile() file: Express.Multer.File,
//     @Body() body: { prompt?: string; }
//   ) {
//     if (!file) {
//       throw new BadRequestException('File is required for OCR processing');
//     }

//     try {
//       const airesponse = await this.ChatModelService.OCR_ProcessReport(
//         file.buffer, 
//         file.originalname, 
//       );
      
//       console.log("OCR response type", typeof airesponse);
      
//       return {
//         content: airesponse,
//         role: "assistant",
//         filename: file.originalname,
//         fileSize: file.size
//       }
//     } catch (error) {
//       throw new BadRequestException(`OCR processing failed: ${error.message}`);
//     }
//   }

//OCR + AI Tesseract
   @Post('process-with-ai') // Full route is POST /ocr/process-with-ai
  @UseInterceptors(FileInterceptor('file'))
  async uploadAndProcessWithAi(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10 MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|pdf)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    this.logger.log(`Received file for OCR + AI processing: ${file.originalname}`);
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    
    // Call the new service method
    const result = await this.ChatModelService.OCR_ProcessReport(
      file.buffer,
      file.originalname,
    );

 const report = await this.ChatModelService.Physics_SmartCheck(
   result
 )

return {
  success : true,
  data : report
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
