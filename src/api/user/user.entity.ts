import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Column({ length: 10, type: 'varchar', unique: true })
    username: string;

    @ApiProperty()
    @Column({ length: 100, type: 'varchar', unique: true })
    password: string;
}