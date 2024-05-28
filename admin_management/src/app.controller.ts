import {Controller, Get, Param, } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {AdminDTO} from './dto/AdminDTO';
import { Admin } from './customer.entity';
import { GetAdminDTO } from './dto/GetAdminDTO';
import { UpdateAdminDTO } from './dto/UpdateAdminDTO';
import * as bcrypt from 'bcrypt'
import { Query } from 'express-serve-static-core';

@Controller()
export class AppController {
  constructor(private readonly adminManagement: AppService) {}

  @MessagePattern({ cmd: 'CREATE_ADMIN' })
  async createAdmin(createAdminDto: AdminDTO): Promise<Admin> {
    console.log("cus.controller",createAdminDto);
    return await this.adminManagement.createAdmin(createAdminDto);
  }

  @MessagePattern({ cmd: 'GET_ADMIN' })
  async getAdminById(
      @Payload() id:any
  ): Promise<Admin | null> {
    return await this.adminManagement.findAdmin(id);
  }

  @MessagePattern({ cmd: 'GET_ADMIN_BY_USERNAME' })
  async getAdminByUsername(
      @Payload() username:any
  ): Promise<Admin | null> {
    console.log('controller.usn:',username);
    return await this.adminManagement.findAdminByUsername(username);
  }

  @MessagePattern({cmd: 'GET_ALL_ADMINS'})
  async getAllAdmins(): Promise<Admin[]>{
    return await this.adminManagement.getAllAdmin();
  }
  
  @MessagePattern({cmd: 'UPDATE_ADMIN'})
  async updateAdmin(@Payload() data: { id: number, updateAdminDto: UpdateAdminDTO }): Promise<Admin> {
    const { id, updateAdminDto } = data;
    return await this.adminManagement.updateAdmin(id, updateAdminDto);
  }

  @MessagePattern({cmd: 'DELETE_ADMIN'})
  async deleteAdmin(@Payload() id:number){
    return await this.adminManagement.deleteAdmin(id);
  }

  @MessagePattern({cmd: 'SEARCH_ALL_ADMINS'})
  async searchAllAdmin(@Payload() query: Query): Promise<Admin[]>{
    return await this.adminManagement.searchAllAdmins(query);
  }

  @MessagePattern({cmd: 'GET_ACTIVE_ADMINS'})
  async getActiveAdmins(){
    return await this.adminManagement.getActiveAdmin();
  }
}
