import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {RegisterCustomerDTO, UpdateCustomerDTO} from "../models/customerModel";

@Controller()
export class CustomerController {
    constructor(
        @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
    ) {}

    @Post('customer/create')
    async createCustomer(@Body() payload: RegisterCustomerDTO) {
        return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
    }

    /*@Post('findCustomer')
    async findCustomerById(@Body() payload:GetCustomerDTO) {
      return this.customerClient.send({cmd:'GET_CUSTOMER'}, payload)
    }*/

    @Get('customer/findCustomer/:id')
    async findCustomer(@Param('id') id: any){
        return this.customerClient.send({cmd:'GET_CUSTOMER'}, id)
    }

    @Get('customer/getAllCustomers')
    async getAllCustomers(){
        return this.customerClient.send({cmd: 'GET_ALL_CUSTOMERS'}, {});
    }

    @Put('customer/update/:id')
    async updateCustomer(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDTO){
        return this.customerClient.send({ cmd: 'UPDATE_CUSTOMER' }, { id, updateCustomerDto });
    }

    @Delete('customer/delete/:id')
    async deleteCustomer(@Param('id') id: number){
        return this.customerClient.send({cmd: 'DELETE_CUSTOMER'}, id);
    }
}
