import { Test, TestingModule } from '@nestjs/testing';
import * as httpMock from 'node-mocks-http';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ArticlesEntity} from './articles.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesResponseDto } from './articles.response.dto';
import { TrackUpdateService } from './../track-update/track-update.service';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;
  let service2: TrackUpdateService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ArticlesService,
      useFactory: () => ({
        getAll: jest.fn(() => {}),
        findAll: jest.fn(() => []),
        getCount: jest.fn(() => Number)
      })
    }

    const ApiServiceProvider2 = {
      provide: TrackUpdateService,
      useFactory: () => ({
        get: jest.fn(() => [])
      })
    }

    const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        ArticlesService,
        TrackUpdateService,
        ApiServiceProvider,
        ApiServiceProvider2
      ]
    })
    .overrideGuard(AuthGuard)
    .useValue(mockGuard)
    .compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
    service2 = module.get<TrackUpdateService>(TrackUpdateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it("calling getAll method", async() => {

    const articles: ArticlesEntity[] = [{
      id: 1,
      title: "Demo",
      url: "https://democ.com",
      imageUrl: "https://democ.com"
    }];

    const total = 1;

    const result = new ArticlesResponseDto();
    result.total = total;
    result.articles = articles;

    const req = httpMock.createRequest();

    jest.spyOn(service, 'getAll').mockImplementation(async() => articles);
    jest.spyOn(service, 'findAll').mockImplementation(async() => articles);
    jest.spyOn(service, 'getCount').mockImplementation(async() => total);

    expect(await controller.getAll(req, 1, 0)).toStrictEqual(result);
  })

});