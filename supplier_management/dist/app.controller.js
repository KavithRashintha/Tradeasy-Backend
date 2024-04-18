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
const SupplierDTO_1 = require("./dto/SupplierDTO");
const bcrypt = require("bcrypt");
let AppController = class AppController {
    constructor(supplierManagement) {
        this.supplierManagement = supplierManagement;
    }
    async createSupplier(createSupplierDto) {
        const saltOrRounds = 10;
        const password = createSupplierDto.supplierPassword;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const dtoWithHashedPassword = { ...createSupplierDto, supplierPassword: hash };
        return await this.supplierManagement.createSupplier(dtoWithHashedPassword);
    }
    async getSupplierById(id) {
        return await this.supplierManagement.getSupplier(id);
    }
    async getAllSuppliers() {
        return await this.supplierManagement.getAllSuppliers();
    }
    async updateSupplier(data) {
        const { id, updateSupplierDto } = data;
        return await this.supplierManagement.updateSupplier(id, updateSupplierDto);
    }
    async deleteSupplier(id) {
        return await this.supplierManagement.deleteSupplier(id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CREATE_SUPPLIER' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SupplierDTO_1.SupplierDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createSupplier", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_SUPPLIER' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getSupplierById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_ALL_SUPPLIERS' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllSuppliers", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'UPDATE_SUPPLIER' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateSupplier", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'DELETE_SUPPLIER' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteSupplier", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map