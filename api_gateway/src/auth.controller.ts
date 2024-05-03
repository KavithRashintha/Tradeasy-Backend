import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {AuthLoginUserDto, AuthRegisterUserDto} from "./models/authModel";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_MANAGEMENT_2') private authClient: ClientProxy,
    ) {}

    @Post('sign-up')
    async signUp(@Body() payload: AuthRegisterUserDto) {
        console.log(payload);
        return this.authClient.send({ cmd: 'signup' }, payload);
    }

    @Post('sign-in')
    async signIn(@Body() payload: AuthLoginUserDto) {
        console.log(payload);
        return this.authClient.send({ cmd: 'signin' }, payload);
    }


}



