import { Module } from '@nestjs/common';
import { LoginAndSignupService } from './login_and_signup.service';
import { LoginAndSignupController } from './login_and_signup.controller';

@Module({
  providers: [LoginAndSignupService],
  controllers: [LoginAndSignupController]
})
export class LoginAndSignupModule {}
