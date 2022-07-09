import { Strategy } from 'passport-local';
import { Request } from 'express'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../api/user/user.entity';

/**
 * Class local strategy
 *
 * @export
 * @class LocalStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    });
  }

  /**
   * Validate account
   *
   * @param {Request} request
   * @param {String} username
   * @param {String} password
   * @memberof LocalStrategy
   */
  async validate(request: Request, email: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
