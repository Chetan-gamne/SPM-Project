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
const storage_controller_1 = require("./storage.controller");
const storage_service_1 = require("./storage.service");
let StorageModule = StorageModule_1 = class StorageModule {
    static forRoot() {
        return {
            module: StorageModule_1,
            exports: [],
            providers: [],
        };
    }
};
StorageModule = StorageModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [storage_controller_1.storageController],
        providers: [storage_service_1.storageService],
        exports: [storage_service_1.storageService],
    })
], StorageModule);
exports.StorageModule = StorageModule;
//# sourceMappingURL=storage.module.js.map