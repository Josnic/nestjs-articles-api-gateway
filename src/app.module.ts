import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AUTH_SECRET_TOKEN, AUTH_JWT_OPTIONS } from './constants';
import { AuthModule } from './auth';
import { connection } from './database/ormconfig';

import { UserModule } from './api/user/user.module';
import { ArticlesModule } from './api/articles/articles.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...connection, autoLoadEntities: true }),
    AuthModule,
    ArticlesModule,
    UserModule,
    ConfigModule.forRoot(),
    HttpModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: AUTH_SECRET_TOKEN,
        signOptions: AUTH_JWT_OPTIONS
      })
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
