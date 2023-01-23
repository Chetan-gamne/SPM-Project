"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageService = void 0;
const storageProvider_1 = require("./storageProvider");
class storageService {
    constructor() {
        this.s3Provider = new storageProvider_1.StorageProvider();
    }
    async upload(file) {
        const { originalname } = file;
        const S3bucket = this.s3Provider.getBucketName();
        return await this.s3Provider.uploadFile(file.buffer, S3bucket, originalname);
    }
}
exports.storageService = storageService;
//# sourceMappingURL=storage.service.js.map