import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';
import { UserEntity } from '../api/user/user.entity';
import { AuthToken, AuthPayload } from './models';
import { UserService } from '../api/user/user.service';
import { comparePassword } from './utils';
import { AUTH_SECRET_TOKEN } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findByUsername(username);
    if (!user) return null
    else if (!isEmpty(user.password)) {
      const matchPassword = await comparePassword(password, user.password)
      if (matchPassword) {
        delete user.password
        return user
      }
    }
    throw new UnauthorizedException("Credentials not valid");
  }

  getAccessToken (payload: AuthPayload) {
    return this.jwtService.sign(payload, {
      secret: AUTH_SECRET_TOKEN
    })
  }

  async login(user: UserEntity): Promise<AuthToken> {
    const payload: AuthPayload = { id: user.id }
    return {
      access_token: this.getAccessToken(payload),
    }
  }
}