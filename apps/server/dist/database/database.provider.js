"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const arangojs_1 = require("arangojs");
exports.databaseProviders = [
    {
        provide: 'http://127.0.0.1:8529',
        useFactory: async () => {
            const db = new arangojs_1.Database({
                url: 'http://127.0.0.1:8529',
                databaseName: 'spm',
            });
            db.useBasicAuth('root', 'admin');
            console.log('spm:' +
                JSON.stringify(db
                    .listCollections()
                    .then(async (res) => {
                    console.log(res);
                    const users = db.collection('users');
                    try {
                        let userdata = await users.lookupByKeys(['2081']);
                        userdata.map((user) => {
                            console.log(user);
                        });
                    }
                    catch (err) {
                        console.log(err);
                    }
                })
                    .catch((err) => console.log(err))));
            return db;
        },
    },
];
//# sourceMappingURL=database.provider.js.map