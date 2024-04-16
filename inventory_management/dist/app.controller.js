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
const InventoryItemDTO_1 = require("./dto/InventoryItemDTO");
let AppController = class AppController {
    constructor(inventoryManagement) {
        this.inventoryManagement = inventoryManagement;
    }
    async addInventoryItem(createInventoryItemDto) {
        return await this.inventoryManagement.addInventoryItem(createInventoryItemDto);
    }
    async getInventoryItem(id) {
        return await this.inventoryManagement.getInventoryItem(id);
    }
    async getInventoryItems() {
        return await this.inventoryManagement.getAllInventoryItems();
    }
    async updateInventoryItem(data) {
        const { id, updateInventoryItemDto } = data;
        return await this.inventoryManagement.updateInventoryItem(id, updateInventoryItemDto);
    }
    async deleteInventoryItem(id) {
        return await this.inventoryManagement.deleteInventoryItem(id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'ADD_INVENTORY_ITEM' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InventoryItemDTO_1.InventoryItemDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addInventoryItem", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_INVENTORY_ITEM' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getInventoryItem", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'GET_ALL_INVENTORY_ITEMS' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getInventoryItems", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'UPDATE_INVENTORY_ITEM' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateInventoryItem", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'DELETE_INVENTORY_ITEM' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteInventoryItem", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map