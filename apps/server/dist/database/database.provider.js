"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const arangojs_1 = require("arangojs");
exports.databaseProviders = [
    {
        provide: 'http://127.0.0.1:8529',
        useFactory: () => {
            const db = new arangojs_1.Database({
                url: 'http://127.0.0.1:8529',
                databaseName: 'SPM',
            });
            db.useBasicAuth('root', '');
            return db;
        },
    },
];
//# sourceMappingURL=database.provider.js.map