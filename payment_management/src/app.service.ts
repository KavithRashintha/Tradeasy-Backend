/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerPayments, SupplierPayments} from './payment.entity';
import { Repository } from 'typeorm';
import { CustomerPaymentDTO, Data} from './dto/cutomerPaymentDTO';
import { SupplierPaymentDTO } from './dto/supplierPaymentDTO';
import { ILike } from "typeorm";
import { Query } from 'express-serve-static-core';
import {Stripe} from 'stripe';
import { Cart } from './stripe/Cart.model';


@Injectable()
export class AppService {
  [x: string]: any;
  private stripe;
  
  constructor(
    @InjectRepository(CustomerPayments)
    private readonly customerPaymentManagement: Repository<CustomerPayments>,

    @InjectRepository(SupplierPayments)
    private readonly supplierPaymentManagement: Repository<SupplierPayments>,
  ){
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
      apiVersion: '2024-04-10'
    })
  }

  async createCustomerPaymentSession(data:{lineItems: Data[]}){
    const line_items:Data[] = data.lineItems.map(item =>(
      {
        price_data: {
          currency: item.price_data.currency,
          product_data: {
            name: item.price_data.product_data.name,
            images: item.price_data.product_data.images
          },
          unit_amount: item.price_data.unit_amount,
        },
        quantity: item.quantity,
      }
    ))

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    console.log('Session url:', session.url);

    return session;
  }

  async saveCustomerPayments(paymentData: CustomerPayments): Promise<any> {
    console.log(paymentData)
    const newPayment = this.customerPaymentManagement.create(paymentData);
    return await this.customerPaymentManagement.save(newPayment);
  }

  async getAllCustomerPayments(): Promise<CustomerPayments[]>{
    return await this.customerPaymentManagement.find();
  }

  async getCustomerPaymentById(id: any): Promise<CustomerPayments | null>{
    return await this.customerPaymentManagement.findOneById(id);
  }

  async searchAllPayments(query: Query): Promise<CustomerPayments[]> {
    console.log('Received query:', query);
    const keyword = (query.query as { keyword?: string }).keyword;
    try {
      const filteredPayments = await this.customerPaymentManagement.find({ where: { customerName: ILike(`%${keyword}%`) } });
      console.log('Filtered suppliers:', filteredPayments);
      return filteredPayments;
    } catch (error) {
      console.error('Error occurred while searching payments:', error);
      return [];
    }
  }

  //Supplier Payments
  async createSupplierPayment(supplierPaymentDTO: SupplierPaymentDTO): Promise<SupplierPayments> {
    const newPayment = this.supplierPaymentManagement.create(supplierPaymentDTO);
    return await this.supplierPaymentManagement.save(newPayment);
  }

  async getAllSupplierPayments(): Promise<SupplierPayments[]>{
    return await this.supplierPaymentManagement.find();
  }

  async searchAllSupplierPayments(query: Query): Promise<SupplierPayments[]> {
    console.log('Received query:', query);
    const keyword = (query.query as { keyword?: string }).keyword;
    try {
      const filteredPayments = await this.supplierPaymentManagement.find({ where: { supplierName: ILike(`%${keyword}%`) } });
      console.log('Filtered suppliers:', filteredPayments);
      return filteredPayments;
    } catch (error) {
      console.error('Error occurred while searching payments:', error);
      return [];
    }
  }

}


