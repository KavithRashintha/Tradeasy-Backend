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
const inventoryModel_1 = require("./models/inventoryModel");
const refundModel_1 = require("./models/refundModel");
let ApprController = class ApprController {
    constructor(inventoryClient, refundClient) {
        this.inventoryClient = inventoryClient;
        this.refundClient = refundClient;
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
    async getInventoryItemByCategory(productCategory) {
        return this.inventoryClient.send({ cmd: 'GET_INVENTORY_ITEM_BY_CATEGORY' }, productCategory);
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
};
exports.ApprController = ApprController;
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
    (0, common_1.Get)('inventory/getByCategory'),
    __param(0, (0, common_1.Query)('productCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getInventoryItemByCategory", null);
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
exports.ApprController = ApprController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('INVENTORY_MANAGEMENT')),
    __param(1, (0, common_1.Inject)('REFUND_MANAGEMENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], ApprController);
//# sourceMappingURL=appr.controller.js.map