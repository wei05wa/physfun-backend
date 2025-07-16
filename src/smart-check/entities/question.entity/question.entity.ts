import { FbdOption } from '../fbd-option.entity';

export class Question {
  id: string;
  problem: string;
  diagrams: FbdOption[];
  correctDiagramId: string;
  // ... อื่น ๆ
}
