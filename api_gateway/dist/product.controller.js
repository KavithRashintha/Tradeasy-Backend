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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const productModel_1 = require("./models/productModel");
const productModel_2 = require("./models/productModel");
let ProductController = class ProductController {
    constructor(productClient) {
        this.productClient = productClient;
    }
    async createProduct(payload) {
        return this.productClient.send({ cmd: 'CREATE_PRODUCT' }, payload);
    }
    async findProduct(id) {
        return this.productClient.send({ cmd: 'GET_PRODUCT' }, id);
    }
    async getAllProducts() {
        return this.productClient.send({ cmd: 'GET_ALL_PRODUCTS' }, {});
    }
    async updateProduct(id, updateProductDto) {
        return this.productClient.send({ cmd: 'UPDATE_PRODUCT' }, { id, updateProductDto });
    }
    async deleteProduct(id) {
        return this.productClient.send({ cmd: 'DELETE_PRODUCT' }, id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productModel_1.RegisterProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('findProduct/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findProduct", null);
__decorate([
    (0, common_1.Get)('getAllProducts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, productModel_2.UpdateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __param(0, (0, common_1.Inject)('PRODUCT_MANAGEMENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ProductController);
//# sourceMappingURL=product.controller.js.map