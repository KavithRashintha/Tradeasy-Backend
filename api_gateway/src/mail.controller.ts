import {Body, Controller, Inject, Post, UseGuards} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {GeneralEmailDTO, OrderStatusChangeEmailDTO} from "./models/emailModel";
import {JwtGuard} from './guards/jwt.guard';

@Controller('email')
export class EmailController {
    constructor(
        @Inject('MAIL_SENDER_SERVICE') private emailClient: ClientProxy,
    ) {}

    //For Normal Emails
    @UseGuards(JwtGuard)
    @Post('send')
    async sendGeneralEmail(@Body() payload: GeneralEmailDTO) {
        // console.log(payload);
        return this.emailClient.send({ cmd: 'SEND_EMAIL_GENERAL' }, payload);
    }

    //For Order Status Changed Emails
    @UseGuards(JwtGuard)
    @Post('send/orderStatus')
    async sendOrderStatusEmail(@Body() payload: OrderStatusChangeEmailDTO) {
        // console.log(payload);
        return this.emailClient.send({ cmd: 'SEND_EMAIL_ORDER_STATUS' }, payload);
    }
}



