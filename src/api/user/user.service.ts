import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async login(username: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { username: username, password: password } });
    if (!user) {
        throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

}