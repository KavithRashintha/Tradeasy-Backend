import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class InvalidatedRefreshTokenError extends Error {
}
export declare class RefreshTokenIdsStorage implements OnApplicationBootstrap, OnApplicationShutdown {
    private configService;
    private redisClient;
    constructor(configService: ConfigService);
    onApplicationBootstrap(): void;
    onApplicationShutdown(signal?: string): Promise<"OK">;
    insert(userId: number, tokenId: string): Promise<void>;
    validate(userId: number, tokenId: string): Promise<boolean>;
    invalidate(userId: number): Promise<void>;
    private getKey;
}
