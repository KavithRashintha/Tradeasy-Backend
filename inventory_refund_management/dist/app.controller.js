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
const inventoryRedundDTO_1 = require("./dto/inventoryRedundDTO");
let AppController = class AppController {
    constructor(inventoryRefundManagement) {
        this.inventoryRefundManagement = inventoryRefundManagement;
    }
    async createInventoryRefund(inventoryRefundDTO) {
        return this.inventoryRefundManagement.createInventoryRefund(inventoryRefundDTO);
    }
    async getAllInventoryRefund() {
        return this.inventoryRefundManagement.getAllInventoryRefund();
    }
    async getInventoryRefundById(inventory_id) {
        return this.inventoryRefundManagement.getInventoryRefundById(inventory_id);
    }
    async deleteCustomerRefund(inventory_id) {
        return await this.inventoryRefundManagement.deleteCustomerRefund(inventory_id);
    }
    async getAllApprovedRefunds() {
        return this.inventoryRefundManagement.getAllApprovedRefunds();
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CREATE_INVENTORY_REFUND' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventoryRedundDTO_1.InventoryRefundDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createInventoryRefund", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_ALL_INVENTORY_REFUND' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllInventoryRefund", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_INVENTORY_REFUND_BY_ID' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getInventoryRefundById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'DELETE_INVENTORY_REFUND' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteCustomerRefund", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_ALL_APPROVED_REFUNDS' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllApprovedRefunds", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map