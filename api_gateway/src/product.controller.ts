import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {CreateProductReviewDTO, ProductQuantityDTO, RegisterProductDTO, UpdateProductDTO} from "./models/productModel";
import {JwtGuard} from './guards/jwt.guard';

@Controller('product')
export class ProductController {
    constructor(
        @Inject('PRODUCT_MANAGEMENT') private productClient: ClientProxy,
    ) {}

    @UseGuards(JwtGuard)
    @Post('create')
    async createProduct(@Body() payload: RegisterProductDTO) {
        return this.productClient.send({ cmd: 'CREATE_PRODUCT' }, payload);
    }

    @UseGuards(JwtGuard)
    @Get(' /:id')
    async findProduct(@Param('id') id: any){
        return this.productClient.send({cmd:'GET_PRODUCT'}, id)
    }

    @UseGuards(JwtGuard)
    @Get('getByName/:productName')
    async getProductByName(@Param('productName') productName: string){
        return this.productClient.send({cmd: 'GET_PRODUCT_BY_NAME'}, productName);
    }

    @UseGuards(JwtGuard)
    @Get('getAllProducts')
    async getAllProducts(){
        return this.productClient.send({cmd: 'GET_ALL_PRODUCTS'}, {});
    }

    @UseGuards(JwtGuard)
    @Put('update/:id')
    async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDTO){
        return this.productClient.send({ cmd: 'UPDATE_PRODUCT' }, { id, updateProductDto });
    }

    @UseGuards(JwtGuard)
    @Put('updateQuantity/:id')
    async updateProductQuantity(@Param('id') id: number, @Body() productQuantityDto: ProductQuantityDTO){
        return this.productClient.send({cmd: 'UPDATE_PRODUCT_QUANTITY'}, {id, productQuantityDto});
    }

    @UseGuards(JwtGuard)
    @Delete('delete/:id')
    async deleteProduct(@Param('id') id: number){
        return this.productClient.send({cmd: 'DELETE_PRODUCT'}, id);
    }

    @UseGuards(JwtGuard)
    @Get('getProductsCount')
    async getProductsCount(){
        return this.productClient.send({cmd: 'GET_PRODUCTS_COUNT'}, {});
    }

    @UseGuards(JwtGuard)
    @Get('getProductsCategoryCount')
    async getProductsCategoryCount(){
        return this.productClient.send({cmd: 'GET_PRODUCTS_CATEGORY_COUNT'}, {});
    }

    @UseGuards(JwtGuard)
    @Post('review/create')
    async createProductReview(@Body() payload: CreateProductReviewDTO) {
        return this.productClient.send({ cmd: 'CREATE_PRODUCT_REVIEW' }, payload);
    }

    @UseGuards(JwtGuard)
    @Get('review/getAllProductsReview')
    async getAllProductsReview(){
        return this.productClient.send({cmd: 'GET_ALL_PRODUCTS_REVIEW'}, {});
    }
}



