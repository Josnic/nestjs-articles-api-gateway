import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

import { AuthService } from './auth.service';
import { UserService } from './../api/user/user.service';
import { UserEntity } from './../api/user/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let sandbox : sinon.SinonSandbox;

  const ApiServiceProvider = {
    provide: UserService,
    useFactory: () => ({
      login: jest.fn(() => {})
    })
  }

  const ApiServiceProvider2 = {
    provide: JwtService,
    useFactory: () => ({
    })
  }

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, ApiServiceProvider, ApiServiceProvider2, {
        provide: getRepositoryToken(UserEntity),
        useValue: sinon.createStubInstance(Repository),
    }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser', async () => {

    const user: UserEntity = {
      id: 1,
      username: "admin",
      password: "password"
    }

    const findOneSpy = jest.spyOn(service, 'validateUser').mockImplementation(async() => user);
    const result = await service.validateUser(user.username, user.password);
    expect(findOneSpy).toHaveBeenCalledWith(user.username, user.password);
    expect(result).toBe(user);
  });

  afterAll(async () => {
    sandbox.restore();
  });

});