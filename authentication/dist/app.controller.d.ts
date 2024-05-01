import { BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './auth.entity';
import { AuthDto } from './dto/auth.dto';
export declare class AppController {
    private readonly authManagement;
    constructor(authManagement: AppService);
    createUser(createAuthDto: AuthDto): Promise<User>;
    validateUser(authDto: any): Promise<any | BadRequestException>;
}
