import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {RegisterProductDTO} from "./models/productModel";

@Controller('product')
export class ProductController {
    constructor(
        @Inject('PRODUCT_MANAGEMENT') private productClient: ClientProxy,
    ) {}

    @Post('create')
    async createProduct(@Body() payload: RegisterProductDTO) {
        return this.productClient.send({ cmd: 'CREATE_PRODUCT' }, payload);
    }
    @Get('getAllProducts')
    async getAllProducts(){
        return this.productClient.send({cmd: 'GET_ALL_PRODUCTS'}, {});
    }

    @Delete('delete/:id')
    async deleteProduct(@Param('id') id: number){
        return this.productClient.send({cmd: 'DELETE_PRODUCT'}, id);
    }
}



