import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RefreshTokenIdsStorage } from './refresh-token-ids-storage';
export declare class AuthService {
    private usersRepository;
    private readonly jwtService;
    private readonly usersService;
    private readonly configService;
    private readonly refreshTokenIdsStorage;
    private readonly logger;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, usersService: UsersService, configService: ConfigService, refreshTokenIdsStorage: RefreshTokenIdsStorage);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    validateUser(username: string, password: string): Promise<any>;
    refreshAccessToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
    invalidateToken(accessToken: string): Promise<void>;
}
