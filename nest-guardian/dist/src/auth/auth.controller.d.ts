import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/register-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../users/user.entity';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    private readonly jwtService;
    constructor(authService: AuthService, usersService: UsersService, jwtService: JwtService);
    signUp(registerUserDto: RegisterUserDto): Promise<User>;
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        access_token: string;
    }>;
    invalidateToken(authorization: string): Promise<{
        message: string;
    }>;
}
