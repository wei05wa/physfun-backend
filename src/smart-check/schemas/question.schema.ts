import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// ------------------- FbdOption -------------------
@Schema()
export class FbdOption {
  @Prop() id: string;
  @Prop() description: string;
  @Prop() image: string;
}
export const FbdOptionSchema = SchemaFactory.createForClass(FbdOption);

// ------------------- Variable -------------------
@Schema()
export class Variable {
  @Prop() symbol: string;
  @Prop() value: number;
  @Prop() unit: string;
  @Prop() description: string;
}
export const VariableSchema = SchemaFactory.createForClass(Variable);

// ------------------- CalculationStep -------------------
@Schema()
export class CalculationStep {
  @Prop() description: string;
  @Prop() expression: string;
}
export const CalculationStepSchema = SchemaFactory.createForClass(CalculationStep);

// ------------------- FinalAnswer -------------------
@Schema()
export class FinalAnswer {
  @Prop() value: number;
  @Prop() unit: string;
}
export const FinalAnswerSchema = SchemaFactory.createForClass(FinalAnswer);

// ------------------- Calculation -------------------
@Schema()
export class Calculation {
  @Prop({ type: [CalculationStepSchema] })
  steps: CalculationStep[];

  @Prop({ type: FinalAnswerSchema })
  finalAnswer: FinalAnswer;
}
export const CalculationSchema = SchemaFactory.createForClass(Calculation);

// ------------------- Question -------------------
export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ required: true })
  problem: string;

  @Prop({ type: [FbdOptionSchema], required: true })
  diagrams: FbdOption[];

  @Prop({ required: true })
  correctDiagramId: string;

  @Prop({ type: [VariableSchema], required: true })
  expectedVariables: Variable[];

  @Prop({ type: CalculationSchema, required: true })
  expectedCalculation: Calculation;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
