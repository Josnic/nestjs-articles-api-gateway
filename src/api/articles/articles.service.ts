import { HttpService } from 'nestjs-http-promise';
import { ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticlesEntity } from './articles.entity';
import { ARTICLES_URL } from './../../constants';


@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesEntity)
    private readonly articlesRepository: Repository<ArticlesEntity>,
    private readonly httpService: HttpService
  ) { }

  @UseInterceptors(ClassSerializerInterceptor)
  async getAll(limit: number = 10, offset: number = 0): Promise<ArticlesEntity[]> {
    return this.articlesRepository.find({
      order: {
        id: 'ASC'
      },
      skip: offset,
      take: limit,
    });
  }

  async findAll(): Promise<ArticlesEntity[]> {
    return this.httpService.get(`${ARTICLES_URL}`);
  }

  async getCount(): Promise<number>{
    return await this.articlesRepository.count();
  } 

  async deleteAll(): Promise<void>{
    await this.articlesRepository.clear()
  } 

  async saveAll(articles: ArticlesEntity[]): Promise<void>{
    await this.articlesRepository.save(articles);
  } 

}