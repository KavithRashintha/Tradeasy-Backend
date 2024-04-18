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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const orderModel_1 = require("./models/orderModel");
const orderModel_2 = require("./models/orderModel");
let OrderController = class OrderController {
    constructor(orderClient) {
        this.orderClient = orderClient;
    }
    async createProduct(payload) {
        return this.orderClient.send({ cmd: 'CREATE_ORDER' }, payload);
    }
    async findOrder(id) {
        return this.orderClient.send({ cmd: 'GET_ORDER' }, id);
    }
    async getAllOrders() {
        return this.orderClient.send({ cmd: 'GET_ALL_ORDERS' }, {});
    }
    async updateOrder(id, updateOrderDto) {
        return this.orderClient.send({ cmd: 'UPDATE_ORDER' }, { id, updateOrderDto });
    }
    async deleteOrder(id) {
        return this.orderClient.send({ cmd: 'DELETE_ORDER' }, id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orderModel_1.RegisterOrderDTO]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('findOrder/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOrder", null);
__decorate([
    (0, common_1.Get)('getAllOrders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, orderModel_2.UpdateOrderDTO]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __param(0, (0, common_1.Inject)('ORDER_MANAGEMENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], OrderController);
//# sourceMappingURL=order.controller.js.map