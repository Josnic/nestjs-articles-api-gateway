import { Test, TestingModule } from '@nestjs/testing';
import * as httpMock from 'node-mocks-http';

import { UserController } from './user.controller';
import { AuthService } from '../../auth';

describe('UserController', () => {
  let controller: UserController;
  let authService: AuthService;

  beforeEach(async () => {

    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => { })
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [AuthService, ApiServiceProvider]
    }).compile();

    controller = module.get<UserController>(UserController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return a object with JWT token', async () => {
    const result = { access_token: "my_access_toen" };

    const req = httpMock.createRequest();
    const mockUser = {
      username: "admin", 
      password: 'admin'
    };
    req.user = mockUser;

    jest.spyOn(authService, 'login').mockImplementation(async() => result);

    expect(await controller.login(req.user)).toBe(result);
  });

});