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
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const createUser_input_1 = require("./dto/createUser.input");
const register_dto_1 = require("./dto/register.dto");
const user_dto_1 = require("./dto/user.dto");
const gql_auth_guard_1 = require("./gql-auth.guard");
let AuthResolver = class AuthResolver {
    constructor(AuthService) {
        this.AuthService = AuthService;
    }
    register(args) {
        return this.AuthService.signup(args);
    }
    verify(user) {
        return user;
    }
    forgotPassword(email) {
        return this.AuthService.forgotPassword(email);
    }
    resetPassword(newPassword, user) {
        console.log(user);
        console.log('New Password ' + newPassword);
        console.log('uid : ', user.user_id);
        return this.AuthService.updatePassowrd(user.user_id, {
            password: newPassword,
        });
    }
    me(user) {
        return this.AuthService.meData(user.user_id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => register_dto_1.RegisterDTO),
    __param(0, (0, graphql_1.Args)('createUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_input_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_dto_1.UserDto),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Context)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "verify", null);
__decorate([
    (0, graphql_1.Mutation)(() => register_dto_1.RegisterDTO),
    __param(0, (0, graphql_1.Args)({ name: 'email' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "forgotPassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => register_dto_1.RegisterDTO),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)({ name: 'newPassword' })),
    __param(1, (0, graphql_1.Context)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "resetPassword", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_dto_1.UserDto),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Context)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "me", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map