import { Database } from "arangojs";

// import { DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

// import {Shared} from '@nestjs/core';
export const databaseProviders = [
  {
    provide: "http://127.0.0.1:8529",
    useFactory: () => {
      const db = new Database({
        url: "http://127.0.0.1:8529",
        databaseName: "SPM",
      });
      db.useBasicAuth("root", "");
      return db;
    },
  },
];
