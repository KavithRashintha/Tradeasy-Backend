/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerPayments} from './payment.entity';
import { Repository } from 'typeorm';
import { CustomerPaymentDTO, Data} from './dto/cutomerPaymentDTO';
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
  ){
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
      apiVersion: '2024-04-10'
    })
  }

  async createCustomerPaymentSession(data: Data[]){

    const line_items:Data[] = data.map(item =>(
      {
        price_data: {
          currency: item.price_data.currency,
          product_data: {
            name: item.price_data.product_data.name,
          },
          unit_amount: item.price_data.unit_amount * 100,
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

    return session.url;
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

}


