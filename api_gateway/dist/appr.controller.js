"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const customerModel_1 = require("./models/customerModel");
const inventoryModel_1 = require("./models/inventoryModel");
const refundModel_1 = require("./models/refundModel");
const supplierModel_1 = require("./models/supplierModel");
const paymentModel_1 = require("./models/paymentModel");
let ApprController = class ApprController {
    constructor(customerClient, inventoryClient, refundClient, supplierClient, paymantClient) {
        this.customerClient = customerClient;
        this.inventoryClient = inventoryClient;
        this.refundClient = refundClient;
        this.supplierClient = supplierClient;
        this.paymantClient = paymantClient;
    }
    async createCustomer(payload) {
        return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
    }
    async findCustomer(id) {
        return this.customerClient.send({ cmd: 'GET_CUSTOMER' }, id);
    }
    async getAllCustomers() {
        return this.customerClient.send({ cmd: 'GET_ALL_CUSTOMERS' }, {});
    }
    async updateCustomer(id, updateCustomerDto) {
        return this.customerClient.send({ cmd: 'UPDATE_CUSTOMER' }, { id, updateCustomerDto });
    }
    async deleteCustomer(id) {
        return this.customerClient.send({ cmd: 'DELETE_CUSTOMER' }, id);
    }
    async createSupplier(payload) {
        return this.supplierClient.send({ cmd: 'CREATE_SUPPLIER' }, payload);
    }
    async getSupplier(id) {
        return this.supplierClient.send({ cmd: 'GET_SUPPLIER' }, id);
    }
    async getAllSuppliers() {
        return this.supplierClient.send({ cmd: 'GET_ALL_SUPPLIERS' }, {});
    }
    async updateSupplier(id, updateSupplierDto) {
        console.log("API - AC");
        return this.supplierClient.send({ cmd: 'UPDATE_SUPPLIER' }, { id, updateSupplierDto });
    }
    async deleteSupplier(id) {
        return this.supplierClient.send({ cmd: 'DELETE_SUPPLIER' }, id);
    }
    async addInventoryItem(payload) {
        return this.inventoryClient.send({ cmd: 'ADD_INVENTORY_ITEM' }, payload);
    }
    async getInventoryItem(id) {
        return this.inventoryClient.send({ cmd: 'GET_INVENTORY_ITEM' }, id);
    }
    async getAllInventoryItems() {
        return this.inventoryClient.send({ cmd: 'GET_ALL_INVENTORY_ITEMS' }, {});
    }
    async updateInventoryItem(id, updateInventoryItemDto) {
        return this.inventoryClient.send({ cmd: 'UPDATE_INVENTORY_ITEM' }, { id, updateInventoryItemDto });
    }
    async deleteInventoryItem(id) {
        return this.inventoryClient.send({ cmd: 'DELETE_INVENTORY_ITEM' }, id);
    }
    async createCustomerRefund(customerRefundDto) {
        return this.refundClient.send({ cmd: 'CREATE_CUSTOMER_REFUND' }, customerRefundDto);
    }
    async getCustomerRefund(id) {
        return this.refundClient.send({ cmd: 'GET_CUSTOMER_REFUND' }, id);
    }
    async getAllCustomerRefunds() {
        return this.refundClient.send({ cmd: 'GET_ALL_CUSTOMER_REFUNDS' }, {});
    }
    async deleteCustomerRefund(id) {
        return this.refundClient.send({ cmd: 'DELETE_CUSTOMER_REFUND' }, id);
    }
    async createCustomerPayment(customerPaymentDto) {
        return this.paymantClient.send({ cmd: 'CREATE_CUSTOMER_PAYMENT' }, customerPaymentDto);
    }
    async getAllCustomerPayments() {
        return await this.paymantClient.send({ cmd: 'GET_ALL_CUSTOMER_PAYMENTS' }, {});
    }
    async getCustomerPaymentById(id) {
        return await this.paymantClient.send({ cmd: 'GET_CUSTOMER_PAYMENT' }, id);
    }
};
exports.ApprController = ApprController;
__decorate([
    (0, common_1.Post)('customer/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customerModel_1.RegisterCustomerDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('customer/findCustomer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "findCustomer", null);
__decorate([
    (0, common_1.Get)('customer/getAllCustomers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.Put)('customer/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, customerModel_1.UpdateCustomerDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Delete)('customer/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.Post)('supplier/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [supplierModel_1.RegisterSupplierDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "createSupplier", null);
__decorate([
    (0, common_1.Get)('supplier/getSupplier/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getSupplier", null);
__decorate([
    (0, common_1.Get)('supplier/getAllSuppliers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getAllSuppliers", null);
__decorate([
    (0, common_1.Put)('supplier/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, supplierModel_1.UpdateSupplierDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "updateSupplier", null);
__decorate([
    (0, common_1.Delete)('supplier/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "deleteSupplier", null);
__decorate([
    (0, common_1.Post)('inventory/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventoryModel_1.InventoryItemDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "addInventoryItem", null);
__decorate([
    (0, common_1.Get)('inventory/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getInventoryItem", null);
__decorate([
    (0, common_1.Get)('inventory/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getAllInventoryItems", null);
__decorate([
    (0, common_1.Put)('inventory/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, inventoryModel_1.UpdateInventoryItemDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "updateInventoryItem", null);
__decorate([
    (0, common_1.Delete)('inventory/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "deleteInventoryItem", null);
__decorate([
    (0, common_1.Post)('refund/customerRefund/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refundModel_1.CustomerRefundDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "createCustomerRefund", null);
__decorate([
    (0, common_1.Get)('refund/customerRefund/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getCustomerRefund", null);
__decorate([
    (0, common_1.Get)('refund/customerRefund/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getAllCustomerRefunds", null);
__decorate([
    (0, common_1.Delete)('refund/customerRefund/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "deleteCustomerRefund", null);
__decorate([
    (0, common_1.Post)('payment/customerPayment/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paymentModel_1.CustomerPaymentDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "createCustomerPayment", null);
__decorate([
    (0, common_1.Get)('payment/customerPayment/getAllCustomerPayments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getAllCustomerPayments", null);
__decorate([
    (0, common_1.Get)('payment/customerPayment/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getCustomerPaymentById", null);
exports.ApprController = ApprController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('CUSTOMER_MANAGEMENT')),
    __param(1, (0, common_1.Inject)('INVENTORY_MANAGEMENT')),
    __param(2, (0, common_1.Inject)('REFUND_MANAGEMENT')),
    __param(3, (0, common_1.Inject)('SUPPLIER_MANAGEMENT')),
    __param(4, (0, common_1.Inject)('PAYMENT_MANAGEMENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], ApprController);
//# sourceMappingURL=appr.controller.js.map