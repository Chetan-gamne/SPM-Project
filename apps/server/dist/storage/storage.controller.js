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
exports.storageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const uploadFileDto_1 = require("../str/dto/uploadFileDto");
const storage_service_1 = require("./storage.service");
let storageController = class storageController {
    constructor(uploadImageService) {
        this.uploadImageService = uploadImageService;
    }
    getHandShake() {
        return 'Handshake is Successful';
    }
    async upload(file, response) {
        try {
            const data = await this.uploadImageService.upload(file);
            return response.status(200).json({
                message: `Image ${file.originalname} uploaded to S3`,
                data,
            });
        }
        catch (error) {
            return response
                .status(500)
                .json(`Failed to upload image to S3: ${error.message}`);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], storageController.prototype, "getHandShake", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { limits: { files: 1 } })),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, type: uploadFileDto_1.FileResponseDTO }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uploadFileDto_1.FileDTO, Object]),
    __metadata("design:returntype", Promise)
], storageController.prototype, "upload", null);
storageController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [storage_service_1.storageService])
], storageController);
exports.storageController = storageController;
//# sourceMappingURL=storage.controller.js.map