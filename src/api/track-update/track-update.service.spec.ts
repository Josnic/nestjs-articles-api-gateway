import { Test, TestingModule } from '@nestjs/testing';
import { TrackUpdateService } from './track-update.service';

describe('TrackUpdateService', () => {
  let service: TrackUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackUpdateService],
    }).compile();

    service = module.get<TrackUpdateService>(TrackUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});