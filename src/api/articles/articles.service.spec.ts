import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';
import { HttpService } from 'nestjs-http-promise';

import { ArticlesService } from './articles.service';
import { ArticlesEntity } from './articles.entity';

describe('ArticlesService', () => {
  
  let service: ArticlesService;
  let sandbox : sinon.SinonSandbox;
  let httpService: HttpService;

  const ApiServiceProvider = {
    provide: HttpService,
    useFactory: () => ({
      get: jest.fn(() => [])
    })
  }

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService, ApiServiceProvider, {
        provide: getRepositoryToken(ArticlesEntity),
        useValue: sinon.createStubInstance(Repository),
    }],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('saveAll', async () => {
    const createSpy = jest.spyOn(service, 'saveAll');
    const dto =  [{
      id: 1,
      title: "Demo",
      url: "https://democ.com",
      imageUrl: "https://democ.com"
    }];
    await service.saveAll(dto);
    expect(createSpy).toHaveBeenCalledWith(dto);
  });

  it('deleteAll', async () => {
    const createSpy = jest.spyOn(service, 'deleteAll');
    await service.deleteAll();
    expect(createSpy).toBeCalled();
  });

  it('getCount', async () => {
    const total = 1;
    jest.spyOn(service, 'getCount').mockImplementation(async() => total);
    expect(await service.getCount()).toBe(total);
  });

  it('getAll', async () => {
    const articles: ArticlesEntity[] = [{
      id: 1,
      title: "Demo",
      url: "https://democ.com",
      imageUrl: "https://democ.com"
    }];
    jest.spyOn(service, 'getAll').mockImplementation(async() => articles);
    expect(await service.getAll()).toBe(articles);
  });

  it('findAll', async () => {
    const response: ArticlesEntity[] = [{
      id: 1,
      title: "Demo",
      url: "https://democ.com",
      imageUrl: "https://democ.com"
    }];

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(async() => response);
    
    expect(await service.findAll()).toStrictEqual(response);
  });

  afterAll(async () => {
    sandbox.restore();
  });

});