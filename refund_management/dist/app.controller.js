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
const customerRefundDTO_1 = require("./dto/customerRefundDTO");
let AppController = class AppController {
    constructor(inventoryClient, refundManagement) {
        this.inventoryClient = inventoryClient;
        this.refundManagement = refundManagement;
    }
    async createCustomerRefund(customerRefundDto) {
        return await this.refundManagement.createCustomerRefund(customerRefundDto);
    }
    async getCustomerRefund(id) {
        return await this.refundManagement.getCustomerRefund(id);
    }
    async getAllCustomerRefunds() {
        return await this.refundManagement.getAllCustomerRefunds();
    }
    async deleteCustomerRefund(id) {
        return await this.refundManagement.deleteCustomerRefund(id);
    }
    async getCustomerRefundByStatus(refundStatus) {
        return await this.refundManagement.getCustomerRefundByStatus(refundStatus);
    }
    async runTestFunction() {
        return await this.inventoryClient.send({ cmd: 'TEST_FUNCTION' }, {});
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CREATE_CUSTOMER_REFUND' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customerRefundDTO_1.CustomerRefundDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createCustomerRefund", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_CUSTOMER_REFUND' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCustomerRefund", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_ALL_CUSTOMER_REFUNDS' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllCustomerRefunds", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'DELETE_CUSTOMER_REFUND' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteCustomerRefund", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_CUSTOMER_REFUND_BY_CATEGORY' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCustomerRefundByStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CALLING_TEST_FUNCTION' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "runTestFunction", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('INVENTORY_MANAGEMENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map