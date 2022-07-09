import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticlesEntity } from './articles.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesEntity)
    private readonly articlesRepository: Repository<ArticlesEntity>
  ) { }

  async getAll(limit: number = 10, offset: number = 0): Promise<ArticlesEntity[]> {
    return this.articlesRepository.find({
      order: {
        id: 'DESC'
      },
      skip: offset,
      take: limit,
    });
  }


}