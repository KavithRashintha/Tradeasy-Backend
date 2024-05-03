import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    private readonly logger;
    constructor(usersService: UsersService);
    validate(payload: JwtPayload): Promise<any>;
}
export {};
