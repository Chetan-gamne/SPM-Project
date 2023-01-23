"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockService = void 0;
const mockProvider_1 = require("./mockProvider");
class MockService {
    constructor() {
        this.MockProvider = new mockProvider_1.MockProvider();
    }
    async upload(file) {
        return await this.MockProvider.uploadFile(file);
    }
}
exports.MockService = MockService;
//# sourceMappingURL=mock.service.js.map