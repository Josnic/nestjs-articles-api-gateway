import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackUpdateService } from './track-update.service';
import { TrackUpdateEntity } from './track-update.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TrackUpdateEntity])],
  providers: [TrackUpdateService],
  controllers: [],
  exports: [TypeOrmModule]
})
export class TrackUpdateModule { }