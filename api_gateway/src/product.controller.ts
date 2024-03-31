import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(
        @Inject('PRODUCT_MANAGEMENT') private productClient: ClientProxy,
    ) {}
    
    @Get('getAllProducts')
    async getAllProducts(){
        return this.productClient.send({cmd: 'GET_ALL_PRODUCTS'}, {});
    }
}



