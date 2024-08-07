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
import * as fs from 'fs';
import * as path from 'path';
import { Multer } from 'multer';


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

  async createCustomerPaymentSession(data:{lineItems: Data[], metadata:any}){
    const line_items = data.lineItems.map(item =>(
      {
        price_data: {
          currency: item.price_data.currency,
          product_data: {
            name: item.price_data.product_data.name,
            images: item.price_data.product_data.images[0]
          },
          unit_amount: item.price_data.unit_amount,
        },
        quantity: item.quantity,
      }
    ))

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: 'http://localhost:3000/redirect',
      cancel_url: 'http://localhost:3000/cancel',
      metadata: data.metadata
    });
    //console.log('Session url:', session);

    return session;
  }

async getCheckoutSession(sessionId: string) {
  try {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    console.log("session:", session)
    return session;
  } catch (error) {
    console.error('Error retrieving session details:', error);
    throw new Error('Could not retrieve session details');
  }
  }

  // async saveCustomerPaymentReceipt(paymentDetails: any): Promise<any> {
  //   console.log(paymentDetails);
  //   try {
  //       const paymentIntent = await this.stripe.paymentIntents.create({
  //           amount: paymentDetails.amount,
  //           currency: 'lkr',
  //           payment_method: paymentDetails.paymentId,
  //           confirm: true,
  //       });
  
  //       if (paymentIntent.status === 'succeeded') {
  //         await this.emailService.sendReceipt(
  //           paymentDetails.email,
  //           'Payment Receipt',
  //           `Thank you for your purchase! Your payment ID is ${paymentIntent.id}.`
  //         );
  //         console.log("Mail sent");
  //       }
        
  //       return paymentIntent;
  //   } catch (error) {
  //       console.error('Error creating payment intent:', error); // Log detailed error
  //       throw new Error('Payment failed');
  //   }
  // }
  

  async saveCustomerPayments(paymentData: CustomerPayments): Promise<any> {
    console.log(paymentData)
    const newPayment = this.customerPaymentManagement.create({
      ...paymentData,
      date: new Date()
    });
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
  // async createSupplierPayment(supplierPaymentDTO: SupplierPaymentDTO): Promise<SupplierPayments> {
  //   const newPayment = this.supplierPaymentManagement.create(supplierPaymentDTO);
  //   return await this.supplierPaymentManagement.save(newPayment);
  // }

  async createSupplierPayment(supplierPaymentDTO: SupplierPaymentDTO): Promise<SupplierPayments> {
    // // Check if the file data exists
    // if (!supplierPaymentDTO.receipt || !supplierPaymentDTO.receipt.buffer) {
    //   throw new Error('File data is missing');
    // }

    // const filePath = await this.saveFile(supplierPaymentDTO.receipt);
    // supplierPaymentDTO.receipt = filePath;

    const newPayment = this.supplierPaymentManagement.create(supplierPaymentDTO);
    return await this.supplierPaymentManagement.save(newPayment);
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    await fs.promises.writeFile(filePath, file.buffer);
    return filePath;
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


