import { Strategy } from "passport-jwt";
import { AppService } from "src/app.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AppService);
    validate(username: string, password: string): Promise<any>;
}
export {};
