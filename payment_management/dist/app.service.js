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
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("./payment.entity");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const stripe_1 = require("stripe");
const fs = require("fs");
const path = require("path");
let AppService = class AppService {
    constructor(customerPaymentManagement, supplierPaymentManagement) {
        this.customerPaymentManagement = customerPaymentManagement;
        this.supplierPaymentManagement = supplierPaymentManagement;
        this.stripe = new stripe_1.Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-04-10'
        });
    }
    async createCustomerPaymentSession(data) {
        const line_items = data.lineItems.map(item => ({
            price_data: {
                currency: item.price_data.currency,
                product_data: {
                    name: item.price_data.product_data.name,
                    images: item.price_data.product_data.images
                },
                unit_amount: item.price_data.unit_amount,
            },
            quantity: item.quantity,
        }));
        const session = await this.stripe.checkout.sessions.create({
            mode: 'payment',
            line_items,
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
        console.log('Session url:', session.url);
        return session;
    }
    async saveCustomerPayments(paymentData) {
        console.log(paymentData);
        const newPayment = this.customerPaymentManagement.create(paymentData);
        return await this.customerPaymentManagement.save(newPayment);
    }
    async getAllCustomerPayments() {
        return await this.customerPaymentManagement.find();
    }
    async getCustomerPaymentById(id) {
        return await this.customerPaymentManagement.findOneById(id);
    }
    async searchAllPayments(query) {
        console.log('Received query:', query);
        const keyword = query.query.keyword;
        try {
            const filteredPayments = await this.customerPaymentManagement.find({ where: { customerName: (0, typeorm_3.ILike)(`%${keyword}%`) } });
            console.log('Filtered suppliers:', filteredPayments);
            return filteredPayments;
        }
        catch (error) {
            console.error('Error occurred while searching payments:', error);
            return [];
        }
    }
    async createSupplierPayment(supplierPaymentDTO) {
        if (!supplierPaymentDTO.receipt || !supplierPaymentDTO.receipt.buffer) {
            throw new Error('File data is missing');
        }
        const filePath = await this.saveFile(supplierPaymentDTO.receipt);
        supplierPaymentDTO.receipt = filePath;
        const newPayment = this.supplierPaymentManagement.create(supplierPaymentDTO);
        return await this.supplierPaymentManagement.save(newPayment);
    }
    async saveFile(file) {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.promises.writeFile(filePath, file.buffer);
        return filePath;
    }
    async getAllSupplierPayments() {
        return await this.supplierPaymentManagement.find();
    }
    async searchAllSupplierPayments(query) {
        console.log('Received query:', query);
        const keyword = query.query.keyword;
        try {
            const filteredPayments = await this.supplierPaymentManagement.find({ where: { supplierName: (0, typeorm_3.ILike)(`%${keyword}%`) } });
            console.log('Filtered suppliers:', filteredPayments);
            return filteredPayments;
        }
        catch (error) {
            console.error('Error occurred while searching payments:', error);
            return [];
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.CustomerPayments)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.SupplierPayments)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map