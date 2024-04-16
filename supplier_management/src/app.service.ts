import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { Repository } from 'typeorm';
import {SupplierDTO} from './dto/SupplierDTO';
import { UpdateSupplierDTO } from './dto/UpdateSupplierDTO';

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

