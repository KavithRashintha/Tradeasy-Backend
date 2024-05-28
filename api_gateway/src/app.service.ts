import {Injectable, BadRequestException, Inject, UnauthorizedException} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import {AuthDto} from "./models/authModel";
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly adminRepository: Repository<User>,
    @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
    @Inject('SUPPLIER_MANAGEMENT') private supplierClient: ClientProxy,
    private jwtService: JwtService,
  ){}
  
  async createUser(createAuthDTO: AuthDto): Promise<User> {
    console.log("Creating user with data:", createAuthDTO);
    
    const existingUser = await this.adminRepository.findOne({ where: { username: createAuthDTO.username } });
    if (existingUser) {
      console.error('User already exists');
      throw new BadRequestException('User already exists');
    }
  
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createAuthDTO.password, saltOrRounds);
    const newUser = this.adminRepository.create({ ...createAuthDTO, password: hash });

    return await this.adminRepository.save(newUser);
  }

  async validateUser(username: string, password: string) {
    const user = await this.adminRepository.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user
  }

  async login(user: any) {
    const { password, ...result} = user;
    const token = this.jwtService.sign(result);
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      access_token: token,
    };
  }

  async validateCustomer(username: string, password: string) {
    const user = await lastValueFrom(this.customerClient.send({ cmd: 'GET_CUSTOMER_BY_USERNAME' }, username));
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user
  }

  async customerLogin(user: any) {
    const { password, ...result} = user;
    const token = this.jwtService.sign(result);
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      access_token: token,
    };
  }

  async validateSupplier(username: string, password: string) {
    const user = await lastValueFrom(this.supplierClient.send({ cmd: 'GET_SUPPLIER_BY_USERNAME' }, username));

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Password does not match');
    }
    
    return user
  }

  async supplierLogin(user: any) {
    const { password, ...result} = user;
    const token = this.jwtService.sign(result);
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      access_token: token,
    };
  }

  async logout(){
    return await{
      access_token: '',
    };
  }
}