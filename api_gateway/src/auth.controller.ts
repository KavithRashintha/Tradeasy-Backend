import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {AuthRegisterUserDto} from "./models/authModel";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_MANAGEMENT_2') private authClient: ClientProxy,
    ) {}

    @Post('sign-up')
    async createProduct(@Body() payload: AuthRegisterUserDto) {
        console.log(payload);
        return this.authClient.send({ cmd: 'signup' }, payload);
    }


}



