import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private readonly userRepo: Repository<User>,
   ) {}

   async createUser(createUserDto: CreateUserDto){
      const user = this.userRepo.create(createUserDto);
      return await this.userRepo.save(user);
   }

    
}
