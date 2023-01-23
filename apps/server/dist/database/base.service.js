"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
let BaseService = class BaseService {
    async getAll(opts) {
        const rst = await this.collection.all(opts);
        return rst._result;
    }
    async getByKey(_key) {
        const rst = await this.collection.lookupByKeys([_key]);
        return rst[0];
    }
    async getByKeys(_key) {
        return await this.collection.lookupByKeys([..._key]);
    }
    async getByBindVars(bindVars) {
        return await this.collection.firstExample(bindVars);
    }
    async updateBykey(_key, body) {
        return await this.collection.update(_key, body, { returnNew: true });
    }
    async insertOne(body) {
        return await this.collection.save(body, { returnNew: true });
    }
    async deleteOne(_key) {
        return await this.collection.removeByKeys([_key], {});
    }
    async deleteByKeys(_keys) {
        return await this.collection.removeByKeys([..._keys], {});
    }
    async count() {
        return await this.collection.count();
    }
};
BaseService = __decorate([
    (0, common_1.Injectable)()
], BaseService);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map