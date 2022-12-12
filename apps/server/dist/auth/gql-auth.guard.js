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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
let GqlAuthGuard = class GqlAuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        console.log('Hello all');
        const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
        const token = ctx.req.headers.authorization;
        if (!token) {
            throw new common_1.HttpException('Not Authenticated', common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = this.authService.verifyByToken(token);
        console.log(user);
        if (!user) {
            throw new common_1.HttpException('Not Authenticated', common_1.HttpStatus.UNAUTHORIZED);
        }
        else {
            ctx.user = user;
            return true;
        }
    }
};
GqlAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;
//# sourceMappingURL=gql-auth.guard.js.map