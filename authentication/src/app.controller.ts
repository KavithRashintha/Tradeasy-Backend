/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards, BadRequestException} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './auth.entity';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly authManagement: AppService) {}

  @MessagePattern({ cmd: 'AUTH_SIGNUP' })
  async createUser(@Payload() createAuthDto: AuthDto): Promise<User> {
    return await this.authManagement.createUser(createAuthDto);
  }

  @UseGuards(AuthGuard('local'))
  @MessagePattern({ cmd: 'AUTH_LOGIN' })
  async validateUser(@Payload() authDto):Promise<any | BadRequestException>{ 
    return await this.authManagement.validateUser(authDto.username, authDto.password); 
  }
}
