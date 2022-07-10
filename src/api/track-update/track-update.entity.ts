import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'track_update' })
export class TrackUpdateEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Column({ type: 'int'})
    apiCall: number;

    @ApiProperty()
    @UpdateDateColumn({ type: 'datetime', default: () => `now()` })
    updated: Date;
}