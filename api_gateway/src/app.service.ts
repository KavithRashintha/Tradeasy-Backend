import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import {AuthDto} from "./models/authModel";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ){}
  
  async createUser(createAuthDTO: AuthDto): Promise<User> {
    const existingUser = await this.authRepository.findOne({ where: { username: createAuthDTO.username } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const saltOrRounds = 10;
    const password = createAuthDTO.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const newUser = this.authRepository.create({ ...createAuthDTO, password: hash });
    return await this.authRepository.save(newUser);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.authRepository.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

}
