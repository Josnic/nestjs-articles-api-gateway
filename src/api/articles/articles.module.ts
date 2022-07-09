import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesEntity } from './articles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth';

@Module({
  imports: [TypeOrmModule.forFeature([ArticlesEntity])],
  providers: [ArticlesService],
  controllers: [ArticlesController],
  exports: [TypeOrmModule]
})
export class ArticlesModule { }