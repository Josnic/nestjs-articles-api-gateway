import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrackUpdateEntity } from './track-update.entity';
import { TrackUpdateDto } from './track-update.dto';

@Injectable()
export class TrackUpdateService {
  constructor(
    @InjectRepository(TrackUpdateEntity)
    private readonly trackRepository: Repository<TrackUpdateEntity>
  ) { }

  async save(dto: TrackUpdateDto): Promise<void>{
    await this.trackRepository.save(dto);
  }

  async get(): Promise<TrackUpdateEntity[]> {
    return await this.trackRepository.find();
  }

  async update(id: number): Promise<void> {
    const track = await this.trackRepository.findOne({ where: { id: id } });
    track.apiCall = track.apiCall + 1;
    await this.trackRepository.save(track);
  }

}