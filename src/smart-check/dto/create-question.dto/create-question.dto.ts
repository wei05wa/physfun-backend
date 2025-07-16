import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class FbdOptionDto {
  @IsString() id: string;
  @IsString() description: string;
  @IsString() image: string;
}

class VariableDto {
  @IsString() symbol: string;
  @IsNumber() value: number;
  @IsString() unit: string;
  @IsString() description: string;
}

class CalculationStepDto {
  @IsString() description: string;
  @IsString() expression: string;
}

class FinalAnswerDto {
  @IsNumber() value: number;
  @IsString() unit: string;
}

class CalculationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CalculationStepDto)
  steps: CalculationStepDto[];

  @ValidateNested()
  @Type(() => FinalAnswerDto)
  finalAnswer: FinalAnswerDto;
}

export class CreateQuestionDto {
  @IsString() problem: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FbdOptionDto)
  diagrams: FbdOptionDto[];

  @IsString() correctDiagramId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariableDto)
  expectedVariables: VariableDto[];

  @ValidateNested()
  @Type(() => CalculationDto)
  expectedCalculation: CalculationDto;
}


