/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AppService } from "src/app.service";
import { AuthDto } from '../models/authModel';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AppService) {
    super({
    });
  }

  async validate(username: string, password: string): Promise<any> { 
    const user = await this.authService.validateUser(username, password); 
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}