import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatmodelService {
private readonly AImodel : OpenAI;



constructor(private configService : ConfigService) {
 const API_KEY = this.configService.get<string>('DEEPSEEK_API_KEY');

 if(!API_KEY){
    throw new Error('Apikey not found.');
 }

 this.AImodel = new OpenAI({apiKey : API_KEY, baseURL:  'https://openrouter.ai/api/v1'});

}


//Phyrai Chat AI
async Phyraimodel(prompt:string): Promise <string> {

if(!prompt || typeof prompt !== 'string' || prompt.trim() === ''){
  throw new Error("Invalid Prompt.")
}

    console.log(`The prompt you send is ${prompt}`)


    try{
       const response = await this.AImodel.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      {
        "role" : "system",
        "content" : "You are a helpful assistant that answers questions based on the provided context."
      }
      ,
      {
                    "role": "user",
                    "content": prompt
                }
    ] ,
    temperature: 0.5,
    
    
  });
 

  if(!response || !response.choices[0].message.content){
    throw new Error("No response from AI");
  }
const AIresponse = response.choices[0].message.content;

  return  AIresponse;

    }catch(error){
throw new Error("Chat Failed:" + error.message)
    }
}



//Basic Chat AI
async MessageModelbasic(prompt:string): Promise <string> {

if(!prompt || typeof prompt !== 'string' || prompt.trim() === ''){
  throw new Error("Invalid Prompt.")
}

    console.log(`The prompt you send is ${prompt}`)


    try{
       const response = await this.AImodel.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      {
        "role" : "system",
        "content" : "You are a helpful assistant that answers questions based on the provided context."
      }
      ,
      {
                    "role": "user",
                    "content": prompt
                }
    ] ,
    temperature: 0.5,
    
  });
 

  if(!response || !response.choices[0].message.content){
    throw new Error("No response from AI");
  }
const AIresponse = response.choices[0].message.content;

  return  AIresponse;

    }catch(error){
throw new Error("Chat Failed:" + error.message)
    }
}

//Intermediate ChatAI
async MessageModelIntermediate(prompt:string): Promise <string> {

if(!prompt || typeof prompt !== 'string' || prompt.trim() === ''){
  throw new Error("Invalid Prompt.")
}

    console.log(`The prompt you send is ${prompt}`)


    try{
       const response = await this.AImodel.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      {
        "role" : "system",
        "content" : "You are a helpful assistant that answers questions based on the provided context. with the person intermediate"
      }
      ,
      {
                    "role": "user",
                    "content": prompt
                }
    ] ,
    temperature: 0.5,
    
  });
 

  if(!response || !response.choices[0].message.content){
    throw new Error("No response from AI");
  }
const AIresponse = response.choices[0].message.content;

  return  AIresponse;

    }catch(error){
throw new Error("Chat Failed:" + error.message)
    }
}


//Professional ChatAI
async MessageModelProfessional(prompt:string): Promise <string> {

if(!prompt || typeof prompt !== 'string' || prompt.trim() === ''){
  throw new Error("Invalid Prompt.")
}

    console.log(`The prompt you send is ${prompt}`)


    try{
       const response = await this.AImodel.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      {
        "role" : "system",
        "content" : "You are a helpful assistant that answers questions based on the provided context. with the person intermediate"
      }
      ,
      {
                    "role": "user",
                    "content": prompt
                }
    ] ,
    temperature: 0.5,
    
  });
 

  if(!response || !response.choices[0].message.content){
    throw new Error("No response from AI");
  }
const AIresponse = response.choices[0].message.content;

  return  AIresponse;

    }catch(error){
throw new Error("Chat Failed:" + error.message)
    }
}

}