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
let ApprController = class ApprController {
    constructor(customerClient) {
        this.customerClient = customerClient;
    }
    async createCustomer(payload) {
        return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
    }
    async findCustomerById(payload) {
        return this.customerClient.send({ cmd: 'GET_CUSTOMER' }, payload);
    }
    async getAllCustomers() {
        return this.customerClient.send({ cmd: 'GET_ALL_CUSTOMERS' }, {});
    }
};
exports.ApprController = ApprController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customerModel_1.RegisterCustomerDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Post)('findCustomer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customerModel_1.GetCustomerDTO]),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "findCustomerById", null);
__decorate([
    (0, common_1.Post)('getAllCustomers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprController.prototype, "getAllCustomers", null);
exports.ApprController = ApprController = __decorate([
    (0, common_1.Controller)('customer'),
    __param(0, (0, common_1.Inject)('CUSTOMER_MANAGEMENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ApprController);
//# sourceMappingURL=appr.controller.js.map