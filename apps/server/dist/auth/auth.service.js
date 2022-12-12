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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const arangojs_1 = require("arangojs");
const base_service_1 = require("../database/base.service");
const idp_service_1 = require("../IDP/idp.service");
let AuthService = class AuthService extends base_service_1.BaseService {
    constructor(db, IDPService) {
        super();
        this.db = db;
        this.IDPService = IDPService;
        this.collection = this.db.collection('users');
    }
    async signup(user) {
        try {
            const userRecord = await this.IDPService.createUser(user);
            await console.log(userRecord.uid);
            const { password } = user, result = __rest(user, ["password"]);
            await this.insertOne(Object.assign(Object.assign({}, result), { _key: userRecord.uid }));
            return { msg: 'User Created Successfully!' };
        }
        catch (error) {
            throw new common_1.HttpException('Unable to Register', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyByToken(token) {
        return await this.IDPService.verify(token);
    }
    async updatePassowrd(uid, data) {
        try {
            const user = await this.IDPService.resetPassword(uid, data);
            console.log('Successfully updated User : ', user.user_id);
            return { msg: 'Successfully Updated Password of user' };
        }
        catch (error) {
            throw new common_1.HttpException('Unable To update Password At this Moment Try again Later', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async forgotPassword(email) {
        const msg = await this.IDPService.forgotPassword(email);
        return msg;
    }
    async meData(userId) {
        try {
            const user = await this.getByKey(userId);
            console.log(user);
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('http://127.0.0.1:8529')),
    __metadata("design:paramtypes", [arangojs_1.Database,
        idp_service_1.IDPService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map