import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { createWorker } from 'tesseract.js';
import * as pdfparse from 'pdf-parse'
// Note: pdfjs-dist doesn't work well in Node.js backend without additional setup
// Consider using pdf-parse or pdf2pic for PDF processing instead

@Injectable()
export class ChatmodelService {
  private readonly logger = new Logger(ChatmodelService.name);
  private readonly AImodel: OpenAI;

  constructor(
    private configService: ConfigService,
  ) {
    const API_KEY = this.configService.get<string>('DEEPSEEK_API_KEY');

    if (!API_KEY) {
      throw new Error('Apikey not found.');
    }

    this.AImodel = new OpenAI({
      apiKey: API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    });
  }

  // Phyrai Chat AI
  async Phyraimodel(prompt: string): Promise<string> {
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      throw new Error('Invalid Prompt.');
    }

    console.log(`The prompt you send is ${prompt}`);

    try {
      const response = await this.AImodel.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful physics assistant that provides clear, accurate explanations about physics concepts and helps analyze scientific content.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
      });

      if (!response || !response.choices[0].message.content) {
        throw new Error('No response from AI');
      }
      const AIresponse = response.choices[0].message.content;

      return AIresponse;
    } catch (error) {
      throw new Error('Chat Failed:' + error.message);
    }
  }

//physics smartcheck
async Physics_SmartCheck(prompt: string): Promise<string> {
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      throw new Error('Invalid Prompt.');
    }

    console.log(`The prompt you send is ${prompt}`);

    try {
      const response = await this.AImodel.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'system',
            content:
              ""
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
      });

      if (!response || !response.choices[0].message.content) {
        throw new Error('No response from AI');
      }
      const AIresponse = response.choices[0].message.content;

      return AIresponse;
    } catch (error) {
      throw new Error('Chat Failed:' + error.message);
    }
  }



  // Fixed OCR Processing Method
  async OCR_ProcessReport(
    fileBuffer: Buffer,
    filename: string,
  ): Promise<string> {
    this.logger.log(`Processing file '${filename}' with OCR.`);

    if (!fileBuffer) {
      throw new Error('File buffer is required for OCR processing.');
    }

    try {
      const fileExtension = filename.toLowerCase().split('.').pop();
      
      if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'].includes(fileExtension || '')) {
        return await this.processImage(fileBuffer, filename);
      } else if (fileExtension === 'pdf') {
         return await this.processPdf(fileBuffer, filename);
      } else {
        throw new Error(`Unsupported file type: ${fileExtension}`);
      }
    } catch (error) {
      this.logger.error('OCR Processing failed:', error);
      throw new InternalServerErrorException(`OCR Processing Failed: ${error.message}`);
    }

    
  }

    private async processPdf(fileBuffer: Buffer, filename: string): Promise<string> {
    this.logger.log(`Parsing text from PDF '${filename}' using pdf-parse.`);
    
    try {
      // 1. Call pdf-parse on the buffer.
      const data = await pdfparse(fileBuffer);
      
      // 2. The entire text content is in `data.text`. No looping is needed.
      this.logger.log(`Successfully extracted ${data.numpages} pages of text from PDF.`);
      return data.text;

    } catch (error) {
      this.logger.error(`Failed to parse PDF file '${filename}':`, error);
      throw new Error('The provided PDF file could not be read or is corrupted.');
    }

    
  }




  // Fixed image processing method - Compatible with all Tesseract.js versions
  private async processImage(fileBuffer: Buffer, filename: string): Promise<string> {
    this.logger.log(`Processing image '${filename}' with Tesseract OCR.`);
    
    let worker;
    try {
      // Simple worker creation - no logger parameter
      worker = await createWorker('eng+tha');
 
      // Configure for better accuracy
      await worker.setParameters({
        tessedit_pageseg_mode: '1', // Automatic page segmentation with OSD
        tessedit_ocr_engine_mode: '2', // LSTM OCR Engine modes
      });

      // Process the image
      this.logger.log('Starting OCR recognition...');
      const { data: { text } } = await worker.recognize(fileBuffer);

      await worker.terminate();
      this.logger.log('Image OCR completed successfully.');
      return text.trim();
    } catch (error) {
      if (worker) {
        await worker.terminate();
      }
      this.logger.error('Image processing failed:', error);
      throw error;
    }




  }

  

  // Basic Chat AI
  async MessageModelbasic(prompt: string): Promise<string> {
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      throw new Error('Invalid Prompt.');
    }

    console.log(`The prompt you send is ${prompt}`);

    try {
      const response = await this.AImodel.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that provides simple, clear answers suitable for beginners.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
      });

      if (!response || !response.choices[0].message.content) {
        throw new Error('No response from AI');
      }
      const AIresponse = response.choices[0].message.content;

      return AIresponse;
    } catch (error) {
      throw new Error('Chat Failed:' + error.message);
    }
  }

  // Intermediate ChatAI
  async MessageModelIntermediate(prompt: string): Promise<string> {
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      throw new Error('Invalid Prompt.');
    }

    console.log(`The prompt you send is ${prompt}`);

    try {
      const response = await this.AImodel.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that provides detailed explanations with examples, suitable for intermediate learners.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
      });

      if (!response || !response.choices[0].message.content) {
        throw new Error('No response from AI');
      }
      const AIresponse = response.choices[0].message.content;

      return AIresponse;
    } catch (error) {
      throw new Error('Chat Failed:' + error.message);
    }
  }

  // Professional ChatAI
  async MessageModelProfessional(prompt: string): Promise<string> {
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      throw new Error('Invalid Prompt.');
    }

    console.log(`The prompt you send is ${prompt}`);

    try {
      const response = await this.AImodel.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert assistant that provides comprehensive, technical explanations with advanced concepts and mathematical details, suitable for professionals and advanced students.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
      });

      if (!response || !response.choices[0].message.content) {
        throw new Error('No response from AI');
      }
      const AIresponse = response.choices[0].message.content;

      return AIresponse;
    } catch (error) {
      throw new Error('Chat Failed:' + error.message);
    }
  }
}