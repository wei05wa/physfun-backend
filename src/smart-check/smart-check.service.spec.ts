import { Test, TestingModule } from '@nestjs/testing';
import { SmartCheckService } from './smart-check.service';

describe('SmartCheckService', () => {
  let service: SmartCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartCheckService],
    }).compile();

    service = module.get<SmartCheckService>(SmartCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
