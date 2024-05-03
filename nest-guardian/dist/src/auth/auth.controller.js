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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const register_user_dto_1 = require("../users/register-user.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const public_decorator_1 = require("./decorators/public.decorator");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const jwt_1 = require("@nestjs/jwt");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const jwt_refresh_token_guard_1 = require("./guards/jwt-refresh-token.guard");
const microservices_1 = require("@nestjs/microservices");
let AuthController = class AuthController {
    constructor(authService, usersService, jwtService) {
        this.authService = authService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(registerUserDto) {
        return this.usersService.create(registerUserDto);
    }
    async signIn(signInDto) {
        return this.authService.signIn(signInDto);
    }
    async refreshToken(refreshTokenDto) {
        return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
    }
    async invalidateToken(authorization) {
        const token = authorization.split(' ')[1];
        await this.authService.invalidateToken(token);
        return { message: 'Token invalidated successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'signup' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_token_guard_1.JwtRefreshTokenGuard),
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('invalidate-token'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "invalidateToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map