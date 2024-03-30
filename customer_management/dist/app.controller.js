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
const CustomerDTO_1 = require("./dto/CustomerDTO");
const GetCustomerDTO_1 = require("./dto/GetCustomerDTO");
const bcrypt = require("bcrypt");
let AppController = class AppController {
    constructor(customerManagement) {
        this.customerManagement = customerManagement;
    }
    async createCustomer(createCustomerDto) {
        const saltOrRounds = 10;
        const password = createCustomerDto.customerPassword;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const dtoWithHashedPassword = { ...createCustomerDto, customerPassword: hash };
        return await this.customerManagement.createCustomer(dtoWithHashedPassword);
    }
    async getCustomerById(getCustomerDto) {
        return await this.customerManagement.findCustomer(getCustomerDto);
    }
    async getAllCustomers() {
        return await this.customerManagement.getAllCustomers();
    }
    async updateCustomer(data) {
        const { id, updateCustomerDto } = data;
        return await this.customerManagement.updateCustomer(id, updateCustomerDto);
    }
    async deleteCustomer(id) {
        return await this.customerManagement.deleteCustomer(id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CREATE_CUSTOMER' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerDTO_1.CustomerDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createCustomer", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_CUSTOMER' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetCustomerDTO_1.GetCustomerDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCustomerById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_ALL_CUSTOMERS' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllCustomers", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'UPDATE_CUSTOMER' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateCustomer", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'DELETE_CUSTOMER' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteCustomer", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map