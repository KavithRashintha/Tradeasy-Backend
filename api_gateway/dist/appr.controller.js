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
let ApprController = class ApprController {
    constructor(customerClient, inventoryClient) {
        this.customerClient = customerClient;
        this.inventoryClient = inventoryClient;
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
    async addInventoryItem(payload) {
        return this.inventoryClient.send({ cmd: 'ADD_INVENTORY_ITEM' }, payload);
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
    (0, common_1.Get)('findCustomer/:id'),
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
    (0, common_1.Post)('inventoryItem/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventoryModel_1.InventoryItemDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "addInventoryItem", null);
exports.ApprController = ApprController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('CUSTOMER_MANAGEMENT')),
    __param(1, (0, common_1.Inject)('INVENTORY_MANAGEMENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], ApprController);
//# sourceMappingURL=appr.controller.js.map