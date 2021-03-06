import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from 'nestjs-http-promise';

import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { UserEntity } from '../api/user/user.entity'
import { UserService } from '../api/user/user.service';
import { AUTH_SECRET_TOKEN, AUTH_JWT_OPTIONS } from '../constants';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    passportModule,
    HttpModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
        secret: AUTH_SECRET_TOKEN,
        signOptions: AUTH_JWT_OPTIONS
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}