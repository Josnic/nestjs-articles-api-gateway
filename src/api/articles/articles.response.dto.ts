import { ApiProperty } from '@nestjs/swagger';

import { ArticlesEntity } from './articles.entity';

export class ArticlesResponseDto {

    @ApiProperty()
    total: number;

    @ApiProperty({type: ArticlesEntity, isArray: true})
    articles: ArticlesEntity[];

} 