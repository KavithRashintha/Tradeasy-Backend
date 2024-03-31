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
const inventoryItem_entity_1 = require("./inventoryItem.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AppService = class AppService {
    constructor(inventoryItemRepository) {
        this.inventoryItemRepository = inventoryItemRepository;
    }
    async addInventoryItem(inventoryItemDto) {
        return await this.inventoryItemRepository.save(inventoryItemDto);
    }
    async getInventoryItem(id) {
        return await this.inventoryItemRepository.findOneById(id);
    }
    async getAllInventoryItems() {
        return await this.inventoryItemRepository.find();
    }
    async updateInventoryItem(id, updatedInventoryItem) {
        await this.inventoryItemRepository.update(id, updatedInventoryItem);
        return await this.inventoryItemRepository.findOneById(id);
    }
    async deleteInventoryItem(id) {
        const result = await this.inventoryItemRepository.delete(id);
        if (!result) {
            return "Not Deleted";
        }
        else {
            return "Successfully Deleted";
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventoryItem_entity_1.Item)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map