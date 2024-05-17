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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const supplierPaymentDTO_1 = require("./dto/supplierPaymentDTO");
let AppController = class AppController {
    constructor(PaymentManagement) {
        this.PaymentManagement = PaymentManagement;
    }
    async createCustomerPaymentSession(data) {
        return await this.PaymentManagement.createCustomerPaymentSession(data);
    }
    async saveCustomerPayments(data) {
        return this.PaymentManagement.saveCustomerPayments(data);
    }
    async getAllCustomerPayments() {
        return await this.PaymentManagement.getAllCustomerPayments();
    }
    async getCustomerPaymentById(id) {
        return await this.PaymentManagement.getCustomerPaymentById(id);
    }
    async searchAllPayments(query) {
        return await this.PaymentManagement.searchAllPayments(query);
    }
    async createSupplierPayment(supplierPaymentDTO) {
        return await this.PaymentManagement.createSupplierPayment(supplierPaymentDTO);
    }
    async getAllSupplierPayments() {
        return await this.PaymentManagement.getAllSupplierPayments();
    }
    async searchAllSupplierPayments(query) {
        return await this.PaymentManagement.searchAllSupplierPayments(query);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CREATE_CHECKOUT_SESSION' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createCustomerPaymentSession", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CREATE_CUSTOMER_PAYMENT' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "saveCustomerPayments", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_ALL_CUSTOMER_PAYMENTS' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllCustomerPayments", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_CUSTOMER_PAYMENT' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCustomerPaymentById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'SEARCH_ALL_CUSTOMER_PAYMENTS' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "searchAllPayments", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CREATE_SUPPLIER_PAYMENT' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [supplierPaymentDTO_1.SupplierPaymentDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createSupplierPayment", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_ALL_SUPPLIER_PAYMENTS' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllSupplierPayments", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'SEARCH_ALL_SUPPLIER_PAYMENTS' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "searchAllSupplierPayments", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map