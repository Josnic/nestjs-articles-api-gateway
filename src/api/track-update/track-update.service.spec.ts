import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as sinon from 'sinon';
import { Repository } from 'typeorm';
import * as moment from 'moment';

import { TrackUpdateEntity } from './track-update.entity';
import { TrackUpdateDto } from './track-update.dto';
import { TrackUpdateService } from './track-update.service';

describe('TrackUpdateService', () => {
  let service: TrackUpdateService;
  let sandbox : sinon.SinonSandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackUpdateService, {
        provide: getRepositoryToken(TrackUpdateEntity),
        useValue: sinon.createStubInstance(Repository),
    }],
    }).compile();

    service = module.get<TrackUpdateService>(TrackUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('save', async () => {
    const createSpy = jest.spyOn(service, 'save');
    const dto: TrackUpdateDto = {
      apiCall: 1
    }  
    await service.save(dto);
    expect(createSpy).toHaveBeenCalledWith(dto);
  });

  it('update', async () => {
    const updateNoteSpy = jest.spyOn(service, 'update');
    const trackId = 1;
    service.update(trackId);
    expect(updateNoteSpy).toHaveBeenCalledWith(trackId);
  });

  it('get', async () => {
    const track: TrackUpdateEntity[] = [{
      id: 1,
      apiCall:  1,
      updated: moment('2022-07-10 13:34:09.786183').toDate()
    }];
    jest.spyOn(service, 'get').mockImplementation(async() => track);
    expect(await service.get()).toBe(track);
  });

  afterAll(async () => {
    sandbox.restore();
  });
  

});