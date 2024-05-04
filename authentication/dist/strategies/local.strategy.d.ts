import { Strategy } from "passport-local";
import { AppService } from "src/app.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AppService);
    validate(username: string, password: string): Promise<any>;
}
export {};
