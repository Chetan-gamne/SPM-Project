"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageProvider = void 0;
const constants_1 = __importDefault(require("./constants"));
const s3_service_1 = require("./s3Storage/s3.service");
const mock_service_1 = require("./mockStorage/mock.service");
const providers = [
    {
        provide: constants_1.default.STORAGE_PROVIDER_S3,
        useClass: s3_service_1.S3Service,
    },
    {
        provide: constants_1.default.STORAGE_PROVIDER_MOCK,
        useClass: mock_service_1.MockService,
    },
];
function getStorageProvider(provider) {
    let service = providers.find((p) => p.provide === provider);
    if (!service) {
        service = providers.find((p) => p.provide === constants_1.default.STORAGE_PROVIDER_MOCK);
    }
    return [
        Object.assign(Object.assign({}, service), { provide: constants_1.default.STORAGE_PROVIDER_SERVICE }),
    ];
}
exports.getStorageProvider = getStorageProvider;
//# sourceMappingURL=index.js.map