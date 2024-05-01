/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { AuthDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async createUser(createAuthDTO: AuthDto): Promise<User> {
    const newUser = this.authRepository.create(createAuthDTO);
    if (newUser) {
      throw new BadRequestException('User already exists');
    }

    const saltOrRounds = 10;
    const password = createAuthDTO.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const dtoWithHashedPassword: AuthDto = { ...createAuthDTO, password: hash };
    return await this.authRepository.save(dtoWithHashedPassword);
  }

  async validateUser(username: string, password: string,):Promise<User> { 
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

  async login(user:AuthDto):Promise<any>{
    const {password, ...result} = user;
    return{
      accessToken: this.jwtService.sign(result),
    }
  }
}
