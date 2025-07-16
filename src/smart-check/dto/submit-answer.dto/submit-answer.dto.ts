import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class VariableDto {
  @IsString() symbol: string;
  @IsString() value: string;
  @IsString() unit: string;
  @IsString() description: string;
}

class StepDto {
  @IsString() description: string;
  @IsString() expression: string;
}

class FinalAnswerDto {
  @IsString() value: string;
  @IsString() unit: string;
}

export class SubmitUserAnswerDto {
  @IsString() userId: string;

  @IsString() questionId: string;

  @IsOptional()
  @IsString()
  selectedDiagramId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariableDto)
  variables?: VariableDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  calculationSteps?: StepDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => FinalAnswerDto)
  finalAnswer?: FinalAnswerDto;
}

