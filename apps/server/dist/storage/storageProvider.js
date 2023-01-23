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
exports.StorageProvider = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
let StorageProvider = class StorageProvider {
    constructor() {
        var _a, _b, _c, _d;
        (this._bucketName = (_a = process.env.AWS_BUCKET_NAME) !== null && _a !== void 0 ? _a : 'new-bucket'),
            (this._s3 = new aws_sdk_1.S3({
                accessKeyId: (_b = process.env.AWS_ACCESS_KEY_ID) !== null && _b !== void 0 ? _b : 'AKIASXAL5JYUD6PZWT55',
                secretAccessKey: (_c = process.env.AWS_SECRET_ACCESS_KEY) !== null && _c !== void 0 ? _c : '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',
                s3ForcePathStyle: true,
                region: (_d = process.env.AWS_REGION) !== null && _d !== void 0 ? _d : 'ap-south-1',
                logger: console,
            }));
    }
    getS3() {
        return this._s3;
    }
    getBucketName() {
        return this._bucketName;
    }
    async uploadFile(file, bucket, name) {
        const s3 = this.getS3();
        const s3Params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(s3Params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    createBucket() {
        this.getS3().createBucket({ Bucket: 'testbucket', ACL: 'public-read' }, (err, data) => {
            console.log(err, data);
        });
    }
};
StorageProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageProvider);
exports.StorageProvider = StorageProvider;
//# sourceMappingURL=storageProvider.js.map