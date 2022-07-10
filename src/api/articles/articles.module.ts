import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from 'nestjs-http-promise'

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesEntity } from './articles.entity';
import { TrackUpdateService } from './../track-update/track-update.service';
import { TrackUpdateEntity } from './../track-update/track-update.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticlesEntity, TrackUpdateEntity]), 
    HttpModule
  ],
  providers: [ArticlesService, TrackUpdateService],
  controllers: [ArticlesController],
  exports: [TypeOrmModule]
})
export class ArticlesModule { }