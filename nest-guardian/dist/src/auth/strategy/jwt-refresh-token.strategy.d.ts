import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../jwt-payload.interface';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly jwtService;
    private readonly usersService;
    private readonly logger;
    constructor(jwtService: JwtService, usersService: UsersService);
    validate(payload: JwtPayload): Promise<any>;
}
export {};
