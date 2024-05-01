import { User } from './auth.entity';
import { AuthDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AppService {
    private readonly authRepository;
    private jwtService;
    constructor(authRepository: Repository<User>, jwtService: JwtService);
    createUser(createAuthDTO: AuthDto): Promise<User>;
    validateUser(username: string, password: string): Promise<User>;
    login(user: AuthDto): Promise<any>;
}
