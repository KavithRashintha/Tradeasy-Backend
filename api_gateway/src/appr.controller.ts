import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards, Res, Req, HttpCode, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { In } from 'typeorm';
import { JwtGuard} from './guards/jwt.guard';
import { RefreshJwtGuard} from './guards/refresh.jwt.guard';
import {AdminAuthGuard, CustomerAuthGuard,SupplierAuthGuard} from './guards/local.guard';
import { GetCustomerDTO, RegisterCustomerDTO, UpdateCustomerDTO } from './models/customerModel';
import { InventoryItemDTO, UpdateInventoryItemDTO } from "./models/inventoryModel";
import { CustomerRefundDTO, InventoryRefundDTO,updateRefundStatusDTO, UpdateInventoryRefundStatusDTO} from "./models/refundModel";
import { RegisterSupplierDTO, UpdateSupplierDTO } from "./models/supplierModel";
import { CustomerPaymentDTO, Data, SupplierPaymentDTO } from "./models/paymentModel";
import { DiscountsDTO } from './models/discountModel';
import { AuthDto } from './models/authModel';
import {RegisterOrderDTO, UpdateOrderDTO, PurchaseOrderDTO, UpdatePurchaseOrderDTO } from "./models/orderModel";
import {RegisterAdminDTO, UpdateAdminDTO} from "./models/adminModel";
import {GeneralEmailDTO, OrderStatusChangeEmailDTO, CustomerWarningEmailDTO, CustomerTerminationEmailDTO, SupplierTerminationEmailDTO, CustomerInvoiceEmailDTO, SupplierCredentialsEmailDTO, PurchaseOrderStatusEmailDTO, InventoryRefundStatusEmailDTO} from "./models/emailModel";
import {CreateProductReviewDTO, ProductQuantityDTO, RegisterProductDTO, UpdateProductDTO} from "./models/productModel";

@Controller()
export class ApprController {
  constructor(
    @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
    @Inject('INVENTORY_MANAGEMENT') private inventoryClient: ClientProxy,
    @Inject('PRODUCT_MANAGEMENT') private productClient: ClientProxy,
    @Inject('REFUND_MANAGEMENT') private refundClient: ClientProxy,
    @Inject('ORDER_MANAGEMENT') private orderClient: ClientProxy,     
    @Inject('SUPPLIER_MANAGEMENT') private supplierClient: ClientProxy,
    @Inject('PAYMENT_MANAGEMENT') private paymantClient: ClientProxy,
    @Inject('DISCOUNT_MANAGEMENT') private discountClient: ClientProxy,
    @Inject('ADMIN_MANAGEMENT') private adminClient: ClientProxy,
    @Inject('MAIL_SENDER_SERVICE') private emailClient: ClientProxy,
    private authManagement: AppService
  ) { }

  //===============================================CUSTOMER_MANAGEMENT=========================================================================
  @UseGuards(JwtGuard)
  @Post('customer/create')
  async createCustomer(@Body() payload: RegisterCustomerDTO) {
    return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
  }

  @UseGuards(JwtGuard)
  @Get('customer/findCustomer/:id')
  async findCustomer(@Param('id') id: any) {
    return this.customerClient.send({ cmd: 'GET_CUSTOMER' }, id)
  }

  @UseGuards(JwtGuard)
  @Get('customer/findCustomerByUsername/:username')
  async findCustomerByUsername(@Param('username') username: any) {
    return this.customerClient.send({ cmd: 'GET_CUSTOMER_BY_USERNAME' }, username)
  }

  @UseGuards(JwtGuard)
  @Get('customer/getAllCustomers')
  async getAllCustomers() {
    return this.customerClient.send({ cmd: 'GET_ALL_CUSTOMERS' }, {});
  }

  @UseGuards(JwtGuard)
  @Put('customer/update/:id')
  async updateCustomer(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDTO) {
    return this.customerClient.send({ cmd: 'UPDATE_CUSTOMER' }, { id, updateCustomerDto });
  }

  @UseGuards(JwtGuard)
  @Delete('customer/delete/:id')
  async deleteCustomer(@Param('id') id: number) {
    return this.customerClient.send({ cmd: 'DELETE_CUSTOMER' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('customer/search')
  async searchAllCustomers(@Query() query: ExpressQuery) {
    return this.customerClient.send({ cmd: 'SEARCH_ALL_CUSTOMERS' }, {query})
  }

  @UseGuards(JwtGuard)
  @Get('customer/activeCustomers')
  async getActiveCustomers(){
    return this.customerClient.send({ cmd: 'GET_ACTIVE_CUSTOMERS' }, {});
  }

  //===============================================ADMIN_MANAGEMENT=========================================================================
  @UseGuards(JwtGuard)
  @Post('admin/create')
  async createAdmin(@Body() payload: RegisterAdminDTO) {
    return this.adminClient.send({ cmd: 'CREATE_ADMIN' }, payload);
  }

  @UseGuards(JwtGuard)
  @Get('admin/findAdmin/:id')
  async findAdmin(@Param('id') id: any) {
    return this.adminClient.send({ cmd: 'GET_ADMIN' }, id)
  }

  @UseGuards(JwtGuard)
  @Get('admin/findAdminByUsername/:username')
  async findAdminByUsername(@Param('username') username: any) {
    return this.adminClient.send({ cmd: 'GET_ADMIN_BY_USERNAME' }, username)
  }

  @UseGuards(JwtGuard)
  @Get('admin/getAllAdmins')
  async getAllAdmins() {
    return this.adminClient.send({ cmd: 'GET_ALL_ADMINS' }, {});
  }

  @UseGuards(JwtGuard)
  @Put('admin/update/:id')
  async updateAdmin(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDTO) {
    return this.adminClient.send({ cmd: 'UPDATE_ADMIN' }, { id, updateAdminDto });
  }

  @UseGuards(JwtGuard)
  @Delete('admin/delete/:id')
  async deleteAdmin(@Param('id') id: number) {
    return this.adminClient.send({ cmd: 'DELETE_ADMIN' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('admin/search')
  async searchAllAdmins(@Query() query: ExpressQuery) {
    return this.adminClient.send({ cmd: 'SEARCH_ALL_ADMINS' }, {query})
  }

  @UseGuards(JwtGuard)
  @Get('admin/activeCustomers')
  async getActiveAdmins(){
    return this.adminClient.send({ cmd: 'GET_ACTIVE_ADMINS' }, {});
  }


  //==========================================================INVENTORY_MANAGEMENT====================================================
  @UseGuards(JwtGuard)
  @Post('inventory/add')
  async addInventoryItem(@Body() payload: InventoryItemDTO) {
    return this.inventoryClient.send({ cmd: 'ADD_INVENTORY_ITEM' }, payload)
  }

  @UseGuards(JwtGuard)
  @Get('inventory/get/:id')
  async getInventoryItem(@Param('id') id: number) {
    return this.inventoryClient.send({ cmd: 'GET_INVENTORY_ITEM' }, id)
  }

  @UseGuards(JwtGuard)
  @Get('inventory/getAll')
  async getAllInventoryItems() {
    return this.inventoryClient.send({ cmd: 'GET_ALL_INVENTORY_ITEMS' }, {})
  }

  @UseGuards(JwtGuard)
  @Put('inventory/update/:id')
  async updateInventoryItem(@Param('id') id: number, @Body() updateInventoryItemDto: UpdateInventoryItemDTO) {
    return this.inventoryClient.send({ cmd: 'UPDATE_INVENTORY_ITEM' }, { id, updateInventoryItemDto });
  }

  @UseGuards(JwtGuard)
  @Delete('inventory/delete/:id')
  async deleteInventoryItem(@Param('id') id: number) {
    return this.inventoryClient.send({ cmd: 'DELETE_INVENTORY_ITEM' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('inventory/getByCategory')
  async getInventoryItemByCategory(@Query('productCategory') productCategory:string){
    return this.inventoryClient.send({cmd: 'GET_INVENTORY_ITEM_BY_CATEGORY'}, productCategory);
  }

  @UseGuards(JwtGuard)
  @Get('inventory/getInventoryStatus')
  async getNumberOfItems(){
    return this.inventoryClient.send({cmd: 'GET_INVENTORY_STATUS'}, {});
  }



  //==========================================================PRODUCT_MANAGEMENT====================================================

  @UseGuards(JwtGuard)
    @Post('product/create')
    async createProduct(@Body() payload: RegisterProductDTO) {
        return this.productClient.send({ cmd: 'CREATE_PRODUCT' }, payload);
    }

    @UseGuards(JwtGuard)
    @Get(' product/:id')
    async findProduct(@Param('id') id: any){
        return this.productClient.send({cmd:'GET_PRODUCT'}, id)
    }

    @UseGuards(JwtGuard)
    @Get('product/getByName/:productName')
    async getProductByName(@Param('productName') productName: string){
        return this.productClient.send({cmd: 'GET_PRODUCT_BY_NAME'}, productName);
    }

    @UseGuards(JwtGuard)
    @Get('product/getAllProducts')
    async getAllProducts(){
        return this.productClient.send({cmd: 'GET_ALL_PRODUCTS'}, {});
    }

    @UseGuards(JwtGuard)
    @Put('product/update/:id')
    async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDTO){
        return this.productClient.send({ cmd: 'UPDATE_PRODUCT' }, { id, updateProductDto });
    }

    @UseGuards(JwtGuard)
    @Put('product/updateQuantity/:id')
    async updateProductQuantity(@Param('id') id: number, @Body() productQuantityDto: ProductQuantityDTO){
        return this.productClient.send({cmd: 'UPDATE_PRODUCT_QUANTITY'}, {id, productQuantityDto});
    }

    @UseGuards(JwtGuard)
    @Delete('product/delete/:id')
    async deleteProduct(@Param('id') id: number){
        return this.productClient.send({cmd: 'DELETE_PRODUCT'}, id);
    }

    @UseGuards(JwtGuard)
    @Get('product/getProductsCount')
    async getProductsCount(){
        return this.productClient.send({cmd: 'GET_PRODUCTS_COUNT'}, {});
    }

    @UseGuards(JwtGuard)
    @Get('product/getProductsCategoryCount')
    async getProductsCategoryCount(){
        return this.productClient.send({cmd: 'GET_PRODUCTS_CATEGORY_COUNT'}, {});
    }

    @UseGuards(JwtGuard)
    @Post('product/review/create')
    async createProductReview(@Body() payload: CreateProductReviewDTO) {
        return this.productClient.send({ cmd: 'CREATE_PRODUCT_REVIEW' }, payload);
    }

    @UseGuards(JwtGuard)
    @Get('product/review/getAllProductsReview')
    async getAllProductsReview(){
        return this.productClient.send({cmd: 'GET_ALL_PRODUCTS_REVIEW'}, {});
    }


  //====================================================REFUND_MANAGEMENT==================================================

  //----------------------------------------------------CUSTOMER_REFUND_MANAGEMENT-----------------------------------------
  @UseGuards(JwtGuard)
  @Post('refund/customerRefund/create')
  async createCustomerRefund(@Body() customerRefundDto: CustomerRefundDTO) {
    return this.refundClient.send({ cmd: 'CREATE_CUSTOMER_REFUND' }, customerRefundDto)
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefund/get/:id')
  async getCustomerRefund(@Param('id') id: number) {
    return this.refundClient.send({ cmd: 'GET_CUSTOMER_REFUND' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefund/getAll')
  async getAllCustomerRefunds() {
    return this.refundClient.send({ cmd: 'GET_ALL_CUSTOMER_REFUNDS' }, {})
  }

  @UseGuards(JwtGuard)
  @Delete('refund/customerRefund/delete/:id')
  async deleteCustomerRefund(@Param('id') id: number) {
    return this.refundClient.send({ cmd: 'DELETE_CUSTOMER_REFUND' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefund/getRefundByStatus')
  async getCustomerRefundByStatus(@Query('refundStatus') refundStatus:string){
    return this.refundClient.send({cmd: 'GET_CUSTOMER_REFUND_BY_CATEGORY'}, refundStatus);
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefund/test')
  async runTestFunction(){
    return await this.refundClient.send({cmd: 'CALLING_TEST_FUNCTION'}, {});
  }

 @UseGuards(JwtGuard)
  @Get('refund/customerRefundCount')
  async getCustomerRefundCount(){
    return await this.refundClient.send({cmd: 'GET_CUSTOMER_REFUND_COUNT'}, {});
  }

  @UseGuards(JwtGuard)
  @Put('refund/customerRefund/updateStatus')
  async updateRefundStatus(@Body() updateRefundStatusDto: updateRefundStatusDTO) {
    return this.refundClient.send({ cmd: 'UPDATE_REFUND_STATUS' }, updateRefundStatusDto);
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefund/getByCustomerId')
  async getCustomerRefundsByCustomerId(@Query('customerId') customerId: string) {
    return this.refundClient.send({ cmd: 'GET_CUSTOMER_REFUND_BY_CUSTOMER_ID' }, customerId);
  }
  

 //----------------------------------------------------Inventory_REFUND_MANAGEMENT-----------------------------------------
@UseGuards(JwtGuard)
 @Post('refund/inventoryRefund/create')
 async createInventoryRefund(@Body() inventoryRefundDTO:InventoryRefundDTO)
  {
    return this.refundClient.send({cmd:'CREATE_INVENTORY_REFUND'},inventoryRefundDTO);
  }
 
@UseGuards(JwtGuard)  
@Get('refund/inventoryRefund/getAll')
async getAllInventoryRefunds(){
  return this.refundClient.send({cmd:'GET_ALL_INVENTORY_REFUND'},{})
}

@UseGuards(JwtGuard)
@Get('refund/inventoryRefund/get/:id')
async getInventoryRefundById(@Param('id') id:number){
  return this.refundClient.send({cmd:'GET_INVENTORY_REFUND_BY_ID'},id)
}

@UseGuards(JwtGuard)
  @Put('refund/inventoryRefund/update/:id')
  async updateInventoryRefunds(@Param('id') id: number, @Body() updateInventoryRefundStatusDTO: UpdateInventoryRefundStatusDTO) {
    return this.refundClient.send({ cmd: 'UPDATE_INVENTORY_REFUND' }, { id, updateInventoryRefundStatusDTO });
}

@UseGuards(JwtGuard)
@Delete('refund/inventoryRefund/delete/:id')
async deleteInventoryRefund(@Param('id') id:number){  
  return this.refundClient.send({cmd:'DELETE_INVENTORY_REFUND'},id)
}

@UseGuards(JwtGuard)
@Get('refund/approvedRefunds/getAll')
  async getAllApprovedRefunds() {
      return this.refundClient.send({ cmd: 'GET_ALL_APPROVED_REFUNDS' }, {});
  }
 

  //================================================ORDER__MANAGEMENT===========================================================================

  //----------------------------------------------------Customer_Order_Management-----------------------------------------

  @UseGuards(JwtGuard)
    @Post('order/create')
    async createProductOrder(@Body() payload: RegisterOrderDTO) {
        return this.orderClient.send({ cmd: 'CREATE_ORDER' }, payload);
    }

    @UseGuards(JwtGuard)
    @Get('order/findOrder/:id')
    async findOrder(@Param('id') id: any){
        return this.orderClient.send({cmd:'GET_ORDER'}, id)
    }

    @UseGuards(JwtGuard)
    @Get('order/getAllOrders')
    async getAllOrders(){
        return this.orderClient.send({cmd: 'GET_ALL_ORDERS'}, {});
    }

    @UseGuards(JwtGuard)
    @Put('order/update/:id')
    async updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDTO){
        return this.orderClient.send({ cmd: 'UPDATE_ORDER' }, { id, updateOrderDto });
    }

    @UseGuards(JwtGuard)
    @Delete('order/delete/:id')
    async deleteOrder(@Param('id') id: number){
        return this.orderClient.send({cmd: 'DELETE_ORDER'}, id);
    }

    @UseGuards(JwtGuard)
    @Get('order/getOrdersCount')
    async getOrdersCount(){
        return this.orderClient.send({cmd: 'GET_ORDERS_COUNT'}, {});
    }


//----------------------------------------------------Inventory_Order_Management----------------------------------------------------

  @UseGuards(JwtGuard)
  @Post('purchaseOrder/create')
  async createPurchaseOrder(@Body() purchaseOrderDTO: PurchaseOrderDTO){
    return this.orderClient.send({cmd: 'CREATE_PURCHASE_ORDER'}, purchaseOrderDTO);
  }

 @UseGuards(JwtGuard)
  @Get('purchaseOrder/getAll')
  async getAllPurchaseOrder(){
    return this.orderClient.send({cmd: 'GET_ALL_PURCHASE_ORDER'}, {});
  }

 @UseGuards(JwtGuard)
  @Get('purchaseOrder/get/:id')
  async getPurchaseOrderById(@Param('id') id:number){
    return this.orderClient.send({cmd: 'GET_PURCHASE_ORDER_BY_ID'}, id);
  }

  @UseGuards(JwtGuard)
  @Put('purchaseOrder/update/:id')
  async updatePurchaseOrder(@Param('id') id: number, @Body() updatePurchaseOrderDTO: UpdatePurchaseOrderDTO) {
    console.log("api:",updatePurchaseOrderDTO)
    return this.orderClient.send({ cmd: 'UPDATE_PURCHASE_ORDER' }, { id, updatePurchaseOrderDTO });
  }

  @UseGuards(JwtGuard)
  @Delete('purchaseOrder/delete/:id')
  async deletePurchaseOrder(@Param('id') id:number){
    return this.orderClient.send({cmd: 'DELETE_PURCHASE_ORDER'}, id);
  }

 @UseGuards(JwtGuard)
  @Get('purchaseOrder/getCountOfOrdersByStatus/:status')
  async getCountOfOrdersByStatus(@Param('status') status: string){
    return this.orderClient.send({cmd: 'GET_COUNT_OF_ORDERS_BY_STATUS'}, status);
  }

 @UseGuards(JwtGuard)
  @Get('purchaseOrder/getCurrentMonthName')
  async getCurrentMonthName(){
    return this.orderClient.send({cmd: 'GET_CURRENT_MONTH_NAME'}, {});
  }

  @UseGuards(JwtGuard)
  @Get('purchaseOrder/search')
  async searchPurchaseOrders(@Query() query: ExpressQuery) {
    return this.orderClient.send({ cmd: 'SEARCH_ALL_ORDERS' }, {query})
  }

  // @UseGuards(JwtGuard)
  @Put('purchaseOrder/markAsDeparted/:id')
  async markAsDeparted(@Param('id') id: number) {
    return this.orderClient.send({ cmd: 'MARK_PURCHASE_ORDER_AS_DEPARTED' }, id);
  }
  
  


  //===================================SUPPLIER_MANAGEMENT===========================================================================
  @UseGuards(JwtGuard)
  @Post('supplier/create')
  async createSupplier(@Body() payload: RegisterSupplierDTO) {
    return this.supplierClient.send({ cmd: 'CREATE_SUPPLIER' }, payload);
  }

  @UseGuards(JwtGuard)
  @Get('supplier/getSupplier/:id')
  async getSupplier(@Param('id') id: any) {
    return this.supplierClient.send({ cmd: 'GET_SUPPLIER' }, id)
  }

  @UseGuards(JwtGuard)
  @Get('supplier/getAllSuppliers')
  async getAllSuppliers() {
    return this.supplierClient.send({ cmd: 'GET_ALL_SUPPLIERS' }, {});
  }

  @UseGuards(JwtGuard)
  @Get('supplier/search')
  async searchAllSuppliers(@Query() query: ExpressQuery) {
    return this.supplierClient.send({ cmd: 'SEARCH_ALL_SUPPLIERS' }, {query})
  }

  @UseGuards(JwtGuard)
  @Put('supplier/update/:id')
  async updateSupplier(@Param('id') id: number, @Body() updateSupplierDto: UpdateSupplierDTO) {
    return this.supplierClient.send({ cmd: 'UPDATE_SUPPLIER' }, { id, updateSupplierDto });
  }

  @UseGuards(JwtGuard)
  @Delete('supplier/delete/:id')
  async deleteSupplier(@Param('id') id: number) {
    return this.supplierClient.send({ cmd: 'DELETE_SUPPLIER' }, id);
  }


  //====================================================PAYMENT_MANAGEMENT==================================================

  //----------------------------------------------------CUSTOMER_Payment_MANAGEMENT-----------------------------------------
  @UseGuards(JwtGuard)
  @Post('payment/customerPayment/checkout')
  async createCustomerPaymentSession(@Body() data: any){
    return this.paymantClient.send({ cmd: 'CREATE_CHECKOUT_SESSION' }, data);
  }

  @UseGuards(JwtGuard)
  @Get('payment/customerPayment/checkout-session/:sessionId')
  async getCheckoutSession(@Param('sessionId') sessionId: string) {
    console.log('Session ID:', sessionId);
    return await this.paymantClient.send({ cmd: 'GET_CHECKOUT_SESSION' }, sessionId);
  }

  @UseGuards(JwtGuard)
  @Post('payment/customerPayment/create')
  async saveCustomerPayments(@Body() data: Data): Promise<any>{
    return this.paymantClient.send({ cmd: 'CREATE_CUSTOMER_PAYMENT' }, data);
  }

  @UseGuards(JwtGuard)
  @Get('payment/customerPayment/getAllCustomerPayments')
  async getAllCustomerPayments() {
    return await this.paymantClient.send({ cmd: 'GET_ALL_CUSTOMER_PAYMENTS' }, {});
  }

  @UseGuards(JwtGuard)
  @Get('payment/customerPayment/get/:id')
  async getCustomerPaymentById(@Param('id') id: number) {
    return await this.paymantClient.send({ cmd: 'GET_CUSTOMER_PAYMENT' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('payment/customerPayment/search')
  async searchAllPayments(@Query() query: ExpressQuery) {
    return this.paymantClient.send({ cmd: 'SEARCH_ALL_CUSTOMER_PAYMENTS' }, {query});
  }


  //----------------------------------------------------SUPPLIER_Payment_MANAGEMENT--------------------------------------------------

  @UseGuards(JwtGuard)
  @Post('payment/supplierPayment/create')
  async createSupplierPayment(@Body() supplierPaymentDTO: SupplierPaymentDTO){
    return this.paymantClient.send({ cmd: 'CREATE_SUPPLIER_PAYMENT' }, supplierPaymentDTO);
  }

  @UseGuards(JwtGuard)
  @Get('payment/supplierPayment/getAll')
  async getAllSupplierPayments() {
    return await this.paymantClient.send({ cmd: 'GET_ALL_SUPPLIER_PAYMENTS' }, {});
  }

  @UseGuards(JwtGuard)
  @Get('payment/supplierPayment/search')
  async searchAllSupplierPayments(@Query() query: ExpressQuery) {
    return this.paymantClient.send({ cmd: 'SEARCH_ALL_SUPPLIER_PAYMENTS' }, {query});
  }


  //====================================================DISCOUNT_MANAGEMENT==========================================================

  @UseGuards(JwtGuard)
  @Post('discounts/create')
  async createDiscount(@Body() discountsDTO: DiscountsDTO) {
    return this.discountClient.send({ cmd: 'CREATE_DISCOUNT' }, discountsDTO);
  }

  @UseGuards(JwtGuard)
  @Get('discounts/search')
  async searchAllDiscounts(@Query() query: ExpressQuery) {
    return this.discountClient.send({ cmd: 'SEARCH_ALL_DISCOUNTS' }, {query})
  }

  @UseGuards(JwtGuard)
  @Get('discounts/get/:id')
  async getDiscountById(@Param('id') id: number) {
    return this.discountClient.send({ cmd: 'GET_DISCOUNT' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('discounts/getAll')
  async getAllDiscounts() {
    return this.discountClient.send({ cmd: 'GET_ALL_DISCOUNTS' }, {})
  }

  @UseGuards(JwtGuard)
  @Delete('discounts/delete/:id')
  async deleteDiscount(@Param('id') id: number) {
    return this.discountClient.send({ cmd: 'DELETE_DISCOUNT' }, id);
  }


  //====================================================MAIL_SENDER_SERVICE==============================================================

  //For Normal Emails
  @UseGuards(JwtGuard)
  @Post('email/send')
  async sendGeneralEmail(@Body() payload: GeneralEmailDTO) {
      // console.log(payload);
      return this.emailClient.send({ cmd: 'SEND_EMAIL_GENERAL' }, payload);
  }

  //For Order Status Changed Emails
  @UseGuards(JwtGuard)
  @Post('email/send/orderStatus')
  async sendOrderStatusEmail(@Body() payload: OrderStatusChangeEmailDTO) {
      return this.emailClient.send({ cmd: 'SEND_EMAIL_ORDER_STATUS' }, payload);
  }

  //For OCustomer Warning Emails
  @UseGuards(JwtGuard)
  @Post('email/send/customerWarning')
  async sendCustomerWarningEmail(@Body() payload: CustomerWarningEmailDTO) {
      return this.emailClient.send({ cmd: 'SEND_EMAIL_CUSTOMER_WARNING' }, payload);
  }

  @UseGuards(JwtGuard)
  @Post('email/send/customerTermination')
  async sendCustomerTerminationEmail(@Body() payload: CustomerTerminationEmailDTO) {
      return this.emailClient.send({ cmd: 'SEND_EMAIL_CUSTOMER_TERMINATION' }, payload);
  }

  @UseGuards(JwtGuard)
  @Post('email/send/supplierTermination')
  async sendSupplierTerminationEmail(@Body() payload: SupplierTerminationEmailDTO) {
      return this.emailClient.send({ cmd: 'SEND_EMAIL_SUPPLIER_TERMINATION' }, payload);
  }

  //For Customer Invoices
  @UseGuards(JwtGuard)
  @Post('email/send/customerInvoice')
  @UseInterceptors(FileInterceptor('pdfFilePath'))
  async sendCustomerInvoiceEmail(
      @UploadedFile() file: Express.Multer.File,
      @Body() payload: CustomerInvoiceEmailDTO
  ) {
      console.log("api:", payload);
      console.log("api:", file);
      const updatedPayload = {
          ...payload,
          pdfFilePath: file.path // or file.buffer depending on how you handle files
      };
      console.log("api:", updatedPayload);
      return this.emailClient.send({ cmd: 'SEND_EMAIL_CUSTOMER_INVOICE' }, updatedPayload);
  }

  //For Supplier Credentials
  @UseGuards(JwtGuard)
  @Post('email/send/supplierCredentials')
  async sendSupplierCredentials(@Body() payload: SupplierCredentialsEmailDTO) {
      return this.emailClient.send({ cmd: 'SEND_EMAIL_SUPPLIER_CREDENTIALS' }, payload);
  }

  //For Purchase Order Status Update
  @UseGuards(JwtGuard)
  @Post('email/send/purchaseOrderStatus')
  async sendPurchaseOrderStatus(@Body() payload: PurchaseOrderStatusEmailDTO) {
      return this.emailClient.send({ cmd: 'SEND_PURCHASE_ORDER_STATUS' }, payload);
  }

  //For Inventory Refund Status Update
  @UseGuards(JwtGuard)
  @Post('email/send/pinventoryRefundStatus')
  async sendInventoryRefundStatus(@Body() payload: InventoryRefundStatusEmailDTO) {
      return this.emailClient.send({ cmd: 'SEND_INVENTORY_REFUND_STATUS' }, payload);
  }


  //========================================================AUTHENTICATION=================================================================

  @Post('auth/signup')
  async adminSignUp(@Body() payload: AuthDto) {
    
    if(payload.role == 'customer'){
      return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
    }
    else if(payload.role == 'supplier'){
      return this.supplierClient.send({ cmd: 'CREATE_SUPPLIER' }, payload);
    }
    else{
      return this.adminClient.send({ cmd: 'CREATE_ADMIN' }, payload);
    }
  }
  
  @HttpCode(HttpStatus.OK)
  @UseGuards(CustomerAuthGuard)
  @Post('auth/customer/login')
  async customerSignIn(@Req() req){
    return await this.authManagement.customerLogin(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(SupplierAuthGuard)
  @Post('auth/supplier/login')
  async supplierSignIn(@Req() req){
    return await this.authManagement.supplierLogin(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminAuthGuard)
  @Post('auth/admin/login')
  async adminSignIn(@Req() req){
    return await this.authManagement.adminLogin(req.user);
  }

  @Post('auth/logout')
  async logout(){
    return await this.authManagement.logout(); 
  }

}