"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtRefreshTokenGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let JwtRefreshTokenGuard = JwtRefreshTokenGuard_1 = class JwtRefreshTokenGuard extends (0, passport_1.AuthGuard)('jwt-refresh-token') {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(JwtRefreshTokenGuard_1.name);
    }
    canActivate(context) {
        return super.canActivate(context);
    }
};
exports.JwtRefreshTokenGuard = JwtRefreshTokenGuard;
exports.JwtRefreshTokenGuard = JwtRefreshTokenGuard = JwtRefreshTokenGuard_1 = __decorate([
    (0, common_1.Injectable)()
], JwtRefreshTokenGuard);
//# sourceMappingURL=jwt-refresh-token.guard.js.map