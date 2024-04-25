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
const discountsDTO_1 = require("./dto/discountsDTO");
let AppController = class AppController {
    constructor(discountManagement) {
        this.discountManagement = discountManagement;
    }
    async createDiscount(discountsDTO) {
        return await this.discountManagement.createDiscount(discountsDTO);
    }
    async getAllDiscounts() {
        return await this.discountManagement.getAllDiscounts();
    }
    async getDiscountById(id) {
        return await this.discountManagement.getDiscountById(id);
    }
    async deleteDiscount(id) {
        return await this.discountManagement.deleteDiscount(id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CREATE_DISCOUNT' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discountsDTO_1.DiscountsDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createDiscount", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_ALL_DISCOUNTS' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllDiscounts", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_DISCOUNT' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getDiscountById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'DELETE_DISCOUNT' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteDiscount", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map