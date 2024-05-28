import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './customer.entity';
import { Repository } from 'typeorm';
import {AdminDTO} from './dto/AdminDTO';
import { GetAdminDTO } from './dto/GetAdminDTO';
import { UpdateAdminDTO } from './dto/UpdateAdminDTO';
import { ILike } from "typeorm";
import { Query } from 'express-serve-static-core';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AppService {
  
  constructor(
      @InjectRepository(Admin)
      private readonly adminRepository: Repository<Admin>,
  ) {}

  async createAdmin(createAdminDTO: AdminDTO): Promise<Admin> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createAdminDTO.password, saltOrRounds);
    const newAdmin = this.adminRepository.create({ ...createAdminDTO, password: hash });

    console.log("cus.service",newAdmin);
    return await this.adminRepository.save(newAdmin);
  }

  async findAdmin(id:any): Promise<Admin | null>{
    return await this.adminRepository.findOneById(id);
  }

  async findAdminByUsername(username:string): Promise<Admin | null>{
    console.log('service.usn:',username);
    return await this.adminRepository.findOne({ where: { username } });
  }


  async getAllAdmin():Promise<Admin[]>{
    return await this.adminRepository.find();
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDTO): Promise<Admin> {
    await this.adminRepository.update(id, updateAdminDto);
    return await this.adminRepository.findOneById(id);
  }
  
  async deleteAdmin(id: number){
    const result = await this.adminRepository.delete(id);
    if(!result){
      return "Not Deleted";
    }else{
      return "Successfully Deleted";
    }
  }

  async searchAllAdmins(query: Query): Promise<Admin[]> {
    console.log('Received query:', query);
    const keyword = (query.query as { keyword?: string }).keyword;
    try {
      const filteredCustomers = await this.adminRepository.find({ where: { username: ILike(`%${keyword}%`) } });
      console.log('Filtered customers:', filteredCustomers);
      return filteredCustomers;
    } catch (error) {
      console.error('Error occurred while searching customers:', error);
      return [];
    }
  }

  async getActiveAdmin(){
    //return await this.adminRepository.find({where:{isActive:true}});
    return await this.adminRepository.count();
  }
}