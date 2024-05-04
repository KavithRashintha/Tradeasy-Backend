import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { Repository } from 'typeorm';
import {SupplierDTO} from './dto/SupplierDTO';
import { UpdateSupplierDTO } from './dto/UpdateSupplierDTO';
import { ILike } from "typeorm";
import { Query } from 'express-serve-static-core';


@Injectable()
export class AppService {
  
  constructor(
      @InjectRepository(Supplier)
      private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async createSupplier(createSupplierDTO: SupplierDTO): Promise<Supplier> {
    const newSupplier = this.supplierRepository.create(createSupplierDTO);
    return await this.supplierRepository.save(newSupplier);
  }

  async getSupplier(id:any): Promise<Supplier | null>{
    return await this.supplierRepository.findOneById(id);
  }

  async getAllSuppliers():Promise<Supplier[]>{
    return await this.supplierRepository.find();
  }

  async searchAllSuppliers(query: Query): Promise<Supplier[]> {
    console.log('Received query:', query);
    const keyword = (query.query as { keyword?: string }).keyword;
    try {
      const filteredSuppliers = await this.supplierRepository.find({ where: { supplierName: ILike(`%${keyword}%`) } });
      console.log('Filtered suppliers:', filteredSuppliers);
      return filteredSuppliers;
    } catch (error) {
      console.error('Error occurred while searching suppliers:', error);
      return [];
    }
  }

  async updateSupplier(id: number, updateSupplierDto: UpdateSupplierDTO): Promise<Supplier> {
    await this.supplierRepository.update(id, updateSupplierDto);
    return await this.supplierRepository.findOneById(id);
  }
  
  async deleteSupplier(id: number){
    const result = await this.supplierRepository.delete(id);
    if(!result){
      return "Not Deleted";
    }else{
      return "Successfully Deleted";
    }
  }
}

