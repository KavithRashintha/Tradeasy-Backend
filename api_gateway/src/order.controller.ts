import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {RegisterOrderDTO} from "./models/orderModel";
import {UpdateOrderDTO} from "./models/orderModel";

@Controller('order')
export class OrderController {
    constructor(
        @Inject('ORDER_MANAGEMENT') private orderClient: ClientProxy,
    ) {}

    @Post('create')
    async createProduct(@Body() payload: RegisterOrderDTO) {
        return this.orderClient.send({ cmd: 'CREATE_ORDER' }, payload);
    }

    @Get('findOrder/:id')
    async findOrder(@Param('id') id: any){
        return this.orderClient.send({cmd:'GET_ORDER'}, id)
    }


    @Get('getAllOrders')
    async getAllOrders(){
        return this.orderClient.send({cmd: 'GET_ALL_ORDERS'}, {});
    }

    @Put('update/:id')
    async updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDTO){
        return this.orderClient.send({ cmd: 'UPDATE_ORDER' }, { id, updateOrderDto });
    }


    @Delete('delete/:id')
    async deleteOrder(@Param('id') id: number){
        return this.orderClient.send({cmd: 'DELETE_ORDER'}, id);
    }
}



