import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'articles' })
export class ArticlesEntity {
    @PrimaryColumn()
    @ApiProperty()
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
}