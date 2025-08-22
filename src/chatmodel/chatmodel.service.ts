import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as pdfparse from 'pdf-parse'
import * as FormData from 'form-data'

@Injectable()
export class ChatmodelService {
  private readonly logger = new Logger(ChatmodelService.name);
  private readonly AImodel: OpenAI;
    private readonly aiForThaiApiKey: string;
  private readonly aiForThaiUrl = 'https://api.aiforthai.in.th/ocr';


  constructor(
    private configService: ConfigService,
  ) {
    const API_KEY = this.configService.get<string>('DEEPSEEK_API_KEY');
    this.aiForThaiApiKey = this.configService.get<string>('AI_FOR_THAI_API_KEY') ?? '';


    if (!API_KEY) {
      throw new Error('Apikey Deepseek not found.');
    }

    if (!this.aiForThaiApiKey){
  throw new Error('Apikey OCR not found.');
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
async Physics_SmartCheck(result: string, problem : string): Promise<string> {

    if (!result || typeof result !== 'string' || result.trim() === ''){
      throw new Error('Invalid Prompt.');
    }

  this.logger.log(`Received prompt: ${problem}`); 
 
    if( !problem || typeof problem !== 'string' || problem.trim() === ""){
      throw new Error('Invalid Problem.');
    }
    


    console.log(`The prompt you send is ${result} and ${problem}`);

    try {
      const response = await this.AImodel.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
         {
  role: "system",
content: "คุณเป็น AI ผู้เชี่ยวชาญด้านการสอนฟิสิกส์ โปรดวิเคราะห์การแก้โจทย์ของนักเรียนตามโจทย์ที่กำหนดและภาพคำตอบที่อัปโหลดมา\n\n**โจทย์:** [ใส่โจทย์ตรงนี้]\n\n**คำตอบของนักเรียน:** [อธิบายสิ่งที่เห็นในภาพ หรือให้ AI อ่านจากรูป]\n\nโปรดวิเคราะห์ตามเกณฑ์ 3 ขั้นตอนหลัก และให้ผลลัพธ์ในรูปแบบ JSON:\n\n### ขั้นตอนที่ 1: การวาดแผนภาพและทำความเข้าใจสถานการณ์\n- วาดรูปถูกต้องตามโจทย์\n- ระบุทิศทาง แรง และตำแหน่งสำคัญ\n- แสดงความเข้าใจสถานการณ์ฟิสิกส์\n\n### ขั้นตอนที่ 2: การกำหนดตัวแปรและค่าคงที่\n- ระบุตัวแปรที่ต้องหาและที่ทราบค่า\n- กำหนดหน่วยที่ถูกต้อง\n- ระบุค่าคงที่ที่จำเป็น\n\n### ขั้นตอนที่ 3: การตั้งสมการและคำนวณ\n- เลือกใช้สมการที่เหมาะสม\n- แทนค่าถูกต้อง\n- คำนวณและได้คำตอบที่ถูกต้อง\n\n## รูปแบบผลลัพธ์ที่ต้องการ (JSON):\n\n```json\n{\n  \"overall_score\": \"0-100\",\n  \"analysis\": {\n    \"diagram\": {\n      \"score\": \"0-100\",\n      \"status\": \"correct|partial|incorrect|missing\",\n      \"strengths\": [\"จุดแข็งที่ 1\", \"จุดแข็งที่ 2\"],\n      \"issues\": [\n        {\n          \"type\": \"major|minor\",\n          \"description\": \"รายละเอียดปัญหา\",\n          \"suggestion\": \"ข้อเสนอแนะการแก้ไข\"\n        }\n      ]\n    },\n    \"variables\": {\n      \"score\": \"0-100\",\n      \"status\": \"correct|partial|incorrect|missing\",\n      \"strengths\": [\"จุดแข็งที่ 1\", \"จุดแข็งที่ 2\"],\n      \"issues\": [\n        {\n          \"type\": \"major|minor\",\n          \"description\": \"รายละเอียดปัญหา\",\n          \"suggestion\": \"ข้อเสนอแนะการแก้ไข\"\n        }\n      ]\n    },\n    \"equations\": {\n      \"score\": \"0-100\",\n      \"status\": \"correct|partial|incorrect|missing\",\n      \"strengths\": [\"จุดแข็งที่ 1\", \"จุดแข็งที่ 2\"],\n      \"issues\": [\n        {\n          \"type\": \"major|minor\",\n          \"description\": \"รายละเอียดปัญหา\",\n          \"suggestion\": \"ข้อเสนอแนะการแก้ไข\"\n        }\n      ]\n    }\n  },\n  \"recommendations\": {\n    \"immediate\": [\"สิ่งที่ควรแก้ไขทันที\"],\n    \"study_focus\": [\"หัวข้อที่ควรทบทวน\"],\n    \"practice_areas\": [\"พื้นที่ที่ควรฝึกฝน\"]\n  },\n  \"correct_solution\": {\n    \"brief_outline\": \"โครงร่างคำตอบที่ถูกต้อง\",\n    \"key_formulas\": [\"สูตรสำคัญที่ควรใช้\"],\n    \"final_answer\": \"คำตอบที่ถูกต้อง\"\n  }\n}\n```"
},
          {
            role: 'user',
            content: `โจทย์: ${problem}\n\nคำตอบของนักเรียน: ${result}`,
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
    this.logger.log(`Processing image '${filename}' with AIFORTHAI OCR.`);
    
   
    try {
          const formData = new FormData();
      formData.append('uploadfile', fileBuffer as any, filename );
  const response = await axios.post(this.aiForThaiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          Apikey: this.aiForThaiApiKey,
        },
        maxContentLength: 10 * 1024 * 1024, // <= 10MB
      });

      const { Original, Spellcorrection } = response.data;

      this.logger.log('Image OCR completed successfully.');
      return Spellcorrection?.trim() || Original?.trim() || '';

    } catch (error) {
   this.logger.error('Image processing failed:', error.response?.data || error.message);
      throw new InternalServerErrorException('OCR API request failed.');
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