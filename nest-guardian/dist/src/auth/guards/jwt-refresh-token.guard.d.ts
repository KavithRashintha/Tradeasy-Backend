import { ExecutionContext } from '@nestjs/common';
declare const JwtRefreshTokenGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtRefreshTokenGuard extends JwtRefreshTokenGuard_base {
    private readonly logger;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
