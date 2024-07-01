import {Injectable, BadRequestException, Inject, UnauthorizedException} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './auth.entity';
import {AuthDto} from "./models/authModel";
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('ADMIN_MANAGEMENT') private adminClient: ClientProxy,
    @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
    @Inject('SUPPLIER_MANAGEMENT') private supplierClient: ClientProxy,
    private jwtService: JwtService,
  ){}
  

  async validateAdmin(username: string, password: string) {
    const user = await lastValueFrom(this.adminClient.send({ cmd: 'GET_ADMIN_BY_USERNAME' }, username));
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Password does not match');
    }

    await lastValueFrom(this.adminClient.send({ cmd: 'UPDATE_LAST_LOGIN' }, { id: user.id, lastLogin: new Date() }));

    return user
  }

  async adminLogin(user: any) {
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

    await lastValueFrom(this.customerClient.send({ cmd: 'UPDATE_LAST_LOGIN' }, { id: user.id, lastLogin: new Date() }));


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

    await lastValueFrom(this.supplierClient.send({ cmd: 'UPDATE_LAST_LOGIN' }, { id: user.id, lastLogin: new Date() }));
    
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