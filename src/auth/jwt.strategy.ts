import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AUTH_SECRET_TOKEN } from '../constants';
import { AuthPayload, AuthUser } from './models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_SECRET_TOKEN,
    });
  }

  validate(payload: AuthPayload): AuthUser {
    return { id: payload.id };
  }
}