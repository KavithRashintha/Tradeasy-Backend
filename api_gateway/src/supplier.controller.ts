import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterSupplierDTO } from './models/supplierModel';
import {GetSupplierDTO,UpdateSupplierDTO } from './models/supplierModel';

@Controller('supplier')
export class SupplierController {
  constructor(
      @Inject('SUPPLIER_MANAGEMENT') private supplierClient: ClientProxy
  ) {}

  //Supplier Management

  @Post('/create')
  async createSupplier(@Body() payload: RegisterSupplierDTO) {
    return this.supplierClient.send({ cmd: 'CREATE_SUPPLIER' }, payload);
  }

  @Get('/getSupplier/:id')
  async getSupplier(@Param('id') id: any){
    return this.supplierClient.send({cmd:'GET_SUPPLIER'}, id)
  }
  
  @Get('/getAllSuppliers')
  async getAllSuppliers(){
    return this.supplierClient.send({cmd: 'GET_ALL_SUPPLIERS'}, {});
  }

  @Put('/update/:id')
  async updateSupplier(@Param('id') id: number, @Body() updateSupplierDto: UpdateSupplierDTO){
    console.log("API - AC");
    return this.supplierClient.send({ cmd: 'UPDATE_SUPPLIER' }, { id, updateSupplierDto });
  }

  @Delete('/delete/:id')
  async deleteSupplier(@Param('id') id: number){
    return this.supplierClient.send({cmd: 'DELETE_SUPPLIER'}, id);
  }


}
