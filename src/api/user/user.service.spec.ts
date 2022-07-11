import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';

describe('UserService', () => {
  let service: UserService;
  let sandbox : sinon.SinonSandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide: getRepositoryToken(UserEntity),
        useValue: sinon.createStubInstance(Repository),
    }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByUsername', async () => {
    const findOneSpy = jest.spyOn(service, 'findByUsername');
    const username: string = "username";
    service.findByUsername(username);
    expect(findOneSpy).toHaveBeenCalledWith(username);
  });

  it('login', async () => {

    const user: UserEntity = {
      id: 1,
      username: "admin",
      password: "password"
    }

    const findOneSpy = jest.spyOn(service, 'login').mockImplementation(async() => user);
    const result = await service.login(user.username, user.password);
    expect(findOneSpy).toHaveBeenCalledWith(user.username, user.password);
    expect(result).toBe(user);
  });

  afterAll(async () => {
    sandbox.restore();
  });

});