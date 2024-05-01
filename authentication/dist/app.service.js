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
const auth_entity_1 = require("./auth.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AppService = class AppService {
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    async createUser(createAuthDTO) {
        const newUser = this.authRepository.create(createAuthDTO);
        if (newUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const saltOrRounds = 10;
        const password = createAuthDTO.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const dtoWithHashedPassword = { ...createAuthDTO, password: hash };
        return await this.authRepository.save(dtoWithHashedPassword);
    }
    async validateUser(username, password) {
        const user = await this.authRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new common_1.BadRequestException('Password does not match');
        }
        return user;
    }
    async login(user) {
        const { password, ...result } = user;
        return {
            accessToken: this.jwtService.sign(result),
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AppService);
//# sourceMappingURL=app.service.js.map