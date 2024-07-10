import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { Repository } from 'typeorm';
import {SupplierDTO, ResetSupplierDTO} from './dto/SupplierDTO';
import { UpdateSupplierDTO } from './dto/UpdateSupplierDTO';
import { ILike } from "typeorm";
import { Query } from 'express-serve-static-core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  
  constructor(
      @InjectRepository(Supplier)
      private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async createSupplier(createSupplierDTO: SupplierDTO): Promise<Supplier> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createSupplierDTO.password, saltOrRounds);
    const newSupplier = this.supplierRepository.create({ 
      ...createSupplierDTO,
       password: hash,
       lastLogin: new Date()
   });

    console.log("sup.service",newSupplier);
    return await this.supplierRepository.save(newSupplier);
  }

  async updateLastLogin(id: number, updateSupplierDto: Partial<UpdateSupplierDTO>): Promise<Supplier> {
    await this.supplierRepository.update(id, updateSupplierDto);
    return await this.supplierRepository.findOneById(id);
  }

  async getSupplier(id:any): Promise<Supplier | null>{
    return await this.supplierRepository.findOneById(id);
  }

  async findSupplierByUsername(username:string): Promise<Supplier | null>{
    return await this.supplierRepository.findOne({ where: { username } });
  }

  async findSupplierByEmail(email: string): Promise<Supplier | null> {
    const query = this.supplierRepository.createQueryBuilder('supplier')
        .where('supplier.email = :email', { email })
        .getOne();

    const supplier = await query;
    console.log('Found supplier:', supplier);

    return supplier;
  }

  async resetSupplier(id: number, resetSupplierDTO: ResetSupplierDTO): Promise<Supplier> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(resetSupplierDTO.password, saltOrRounds);
    
    await this.supplierRepository.update(id, { password: hash });
    return await this.supplierRepository.findOneById(id);
  }

  async getAllSuppliers():Promise<Supplier[]>{
    return await this.supplierRepository.find();
  }

  async searchAllSuppliers(query: Query): Promise<Supplier[]> {
    console.log('Received query:', query);
    const keyword = (query.query as { keyword?: string }).keyword;
    try {
      const filteredSuppliers = await this.supplierRepository.find({ where: { username: ILike(`%${keyword}%`) } });
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

