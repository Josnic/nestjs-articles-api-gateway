import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'articles' })
export class ArticlesEntity {
    @PrimaryColumn()
    @Exclude()
    id: number;

    @ApiProperty()
    @Column({ type: 'text' })
    title: string;

    @ApiProperty()
    @Column({ type: 'text' })
    url: string;

    @ApiProperty()
    @Column({ type: 'text' })
    imageUrl: string;

    constructor(partial: Partial<ArticlesEntity>) {
        Object.assign(this, partial);
    }
}