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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const discount_entity_1 = require("./discount.entity");
const typeorm_2 = require("typeorm");
let AppService = class AppService {
    constructor(discountManagement) {
        this.discountManagement = discountManagement;
    }
    async createDiscount(discountsDTO) {
        const newDiscount = this.discountManagement.create(discountsDTO);
        return await this.discountManagement.save(newDiscount);
    }
    async getAllDiscounts() {
        return await this.discountManagement.find();
    }
    async searchAllDiscounts(query) {
        console.log('Received query:', query);
        const keyword = query.query.keyword;
        try {
            const filteredDiscounts = await this.discountManagement.find({ where: { productName: (0, typeorm_2.ILike)(`%${keyword}%`) } });
            console.log('Filtered discounts:', filteredDiscounts);
            return filteredDiscounts;
        }
        catch (error) {
            console.error('Error occurred while searching discounts:', error);
            return [];
        }
    }
    async getDiscountById(id) {
        return await this.discountManagement.findOneById(id);
    }
    async deleteExpiredDiscounts() {
        try {
            const currentDate = new Date();
            await this.discountManagement.delete({ endDate: (0, typeorm_2.LessThan)(currentDate.toISOString()) });
            console.log('Expired discounts deleted successfully.');
        }
        catch (error) {
            console.error('Error deleting expired discounts:', error);
        }
    }
    async deleteDiscount(id) {
        const result = await this.discountManagement.delete(id);
        if (!result) {
            return "Not Deleted";
        }
        else {
            return "Successfully Deleted";
        }
    }
};
exports.AppService = AppService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppService.prototype, "deleteExpiredDiscounts", null);
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(discount_entity_1.Discounts)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AppService);
//# sourceMappingURL=app.service.js.map