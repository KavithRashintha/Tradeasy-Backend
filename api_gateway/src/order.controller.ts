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

    // @Get('findProduct/:id')
    // async findProduct(@Param('id') id: any){
    //     return this.productClient.send({cmd:'GET_PRODUCT'}, id)
    // }
    //
    //
    // @Get('getAllProducts')
    // async getAllProducts(){
    //     return this.productClient.send({cmd: 'GET_ALL_PRODUCTS'}, {});
    // }
    //
    // @Put('update/:id')
    // async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDTO){
    //     return this.productClient.send({ cmd: 'UPDATE_PRODUCT' }, { id, updateProductDto });
    // }
    //
    // @Delete('delete/:id')
    // async deleteProduct(@Param('id') id: number){
    //     return this.productClient.send({cmd: 'DELETE_PRODUCT'}, id);
    // }
}



