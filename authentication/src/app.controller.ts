import { Controller, Post, Body, BadRequestException, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './auth.entity';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AppController {
  constructor(private readonly authManagement: AppService) {}

  @Post('signup')
  async createUser(@Body() createAuthDto: AuthDto): Promise<User> {
    try {
      return await this.authManagement.createUser(createAuthDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async validateUser(@Body() authDto:AuthDto, @Res() res: Response): Promise<User | BadRequestException> {
    try {
      return await this.authManagement.login(authDto,res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
