import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {SupplierDTO} from './dto/SupplierDTO';
import { Supplier } from './supplier.entity';
import { UpdateSupplierDTO } from './dto/UpdateSupplierDTO';
import * as bcrypt from 'bcrypt';
import { Query } from 'express-serve-static-core';


@Controller()
export class AppController {
  constructor(private readonly supplierManagement: AppService) {}

  @MessagePattern({ cmd: 'CREATE_SUPPLIER' })
  async createSupplier(
      @Payload() createSupplierDto: SupplierDTO,
  ): Promise<Supplier> {
    const saltOrRounds = 10;
    const password = createSupplierDto.supplierPassword;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const dtoWithHashedPassword: SupplierDTO = { ...createSupplierDto, supplierPassword: hash };

    return await this.supplierManagement.createSupplier(dtoWithHashedPassword);
  }


  @MessagePattern({ cmd: 'GET_SUPPLIER' })
  async getSupplierById(
      @Payload() id:any
  ): Promise<Supplier | null> {
    return await this.supplierManagement.getSupplier(id);
  }


  @MessagePattern({cmd: 'GET_ALL_SUPPLIERS'})
  async getAllSuppliers(): Promise<Supplier[]>{
    return await this.supplierManagement.getAllSuppliers();
  }

  @MessagePattern({cmd: 'SEARCH_ALL_SUPPLIERS'})
  async searchAllSuppliers(@Payload() query: Query): Promise<Supplier[]>{
    return await this.supplierManagement.searchAllSuppliers(query);
  }

  
  @MessagePattern({cmd: 'UPDATE_SUPPLIER'})
  async updateSupplier(@Payload() data: { id: number, updateSupplierDto: UpdateSupplierDTO }): Promise<Supplier> {
    const { id, updateSupplierDto } = data;
    return await this.supplierManagement.updateSupplier(id, updateSupplierDto);
  }

  @MessagePattern({cmd: 'DELETE_SUPPLIER'})
  async deleteSupplier(@Payload() id:number){
    return await this.supplierManagement.deleteSupplier(id);
  }
}

