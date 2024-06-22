// import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import {RegisterOrderDTO} from "./models/orderModel";
// import {UpdateOrderDTO} from "./models/orderModel";
// import {JwtGuard} from './guards/jwt.guard';

// @Controller('order')
// export class OrderController {
//     constructor(
//         @Inject('ORDER_MANAGEMENT') private orderClient: ClientProxy,
//     ) {}

//     @UseGuards(JwtGuard)
//     @Post('create')
//     async createProduct(@Body() payload: RegisterOrderDTO) {
//         return this.orderClient.send({ cmd: 'CREATE_ORDER' }, payload);
//     }

//     @UseGuards(JwtGuard)
//     @Get('findOrder/:id')
//     async findOrder(@Param('id') id: any){
//         return this.orderClient.send({cmd:'GET_ORDER'}, id)
//     }

//     @UseGuards(JwtGuard)
//     @Get('getAllOrders')
//     async getAllOrders(){
//         return this.orderClient.send({cmd: 'GET_ALL_ORDERS'}, {});
//     }

//     @UseGuards(JwtGuard)
//     @Put('update/:id')
//     async updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDTO){
//         return this.orderClient.send({ cmd: 'UPDATE_ORDER' }, { id, updateOrderDto });
//     }

//     @UseGuards(JwtGuard)
//     @Delete('delete/:id')
//     async deleteOrder(@Param('id') id: number){
//         return this.orderClient.send({cmd: 'DELETE_ORDER'}, id);
//     }
// }



