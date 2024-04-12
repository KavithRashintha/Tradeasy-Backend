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
exports.SupplierController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const supplierModel_1 = require("./models/supplierModel");
const supplierModel_2 = require("./models/supplierModel");
let SupplierController = class SupplierController {
    constructor(supplierClient) {
        this.supplierClient = supplierClient;
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
};
exports.SupplierController = SupplierController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [supplierModel_1.RegisterSupplierDTO]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "createSupplier", null);
__decorate([
    (0, common_1.Get)('/getSupplier/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getSupplier", null);
__decorate([
    (0, common_1.Get)('/getAllSuppliers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getAllSuppliers", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, supplierModel_2.UpdateSupplierDTO]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "updateSupplier", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "deleteSupplier", null);
exports.SupplierController = SupplierController = __decorate([
    (0, common_1.Controller)('supplier'),
    __param(0, (0, common_1.Inject)('SUPPLIER_MANAGEMENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], SupplierController);
//# sourceMappingURL=supplier.controller.js.map