"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StorageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const common_1 = require("@nestjs/common");
const _1 = require(".");
const storage_controller_1 = require("./storage.controller");
let StorageModule = StorageModule_1 = class StorageModule {
    static forRoot(provider) {
        const service = (0, _1.getStorageProvider)(provider);
        return {
            module: StorageModule_1,
            exports: service,
            providers: service,
        };
    }
};
StorageModule = StorageModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [storage_controller_1.storageController],
        providers: [],
        exports: [],
    })
], StorageModule);
exports.StorageModule = StorageModule;
//# sourceMappingURL=storage.module.js.map