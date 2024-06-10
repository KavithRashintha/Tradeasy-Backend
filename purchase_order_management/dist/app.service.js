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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const purchaseorder_entity_1 = require("./purchaseorder.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
let AppService = class AppService {
    constructor(purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }
    async createPurchaseOrder(purchaseOrderDTO) {
        const newPurchaseOrder = this.purchaseOrder.create(purchaseOrderDTO);
        return await this.purchaseOrder.save(newPurchaseOrder);
    }
    async getAllPurchaseOrder() {
        return await this.purchaseOrder.find();
    }
    async getPurchaseOrderById(purchase_id) {
        return await this.purchaseOrder.findOneById(purchase_id);
    }
    async deletePurchaseOrder(purchase_id) {
        const result = await this.purchaseOrder.delete(purchase_id);
        if (!result) {
            return 'Not Deleted';
        }
        else {
            return 'Successfully Deleted';
        }
    }
    async getCountOfOrdersByStatus(status) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const query = this.purchaseOrder.createQueryBuilder('purchase_order')
            .andWhere(`EXTRACT(YEAR FROM purchase_order.createdDate) = :year`, { year: currentYear })
            .andWhere(`EXTRACT(MONTH FROM purchase_order.createdDate) = :month`, { month: currentMonth });
        if (status !== 'total') {
            query.andWhere('purchase_order.status = :status', { status });
        }
        return await query.getCount();
    }
    getCurrentMonthName() {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentMonthIndex = new Date().getMonth();
        return months[currentMonthIndex];
    }
    async searchAllOrders(query) {
        console.log('Received query:', query);
        const keyword = query.query.keyword;
        try {
            const filteredorders = await this.purchaseOrder.find({ where: { supplier: (0, typeorm_3.ILike)(`%${keyword}%`) } });
            console.log('Filtered orders:', filteredorders);
            return filteredorders;
        }
        catch (error) {
            console.error('Error occurred while searching orders:', error);
            return [];
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchaseorder_entity_1.PurchaseOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map