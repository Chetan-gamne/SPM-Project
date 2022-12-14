import { Database } from 'arangojs';
import { constants } from 'src/server.constants';

const { DB_HOSTURL, DB_NAME, DB_PASSWORD, DB_USERNAME } = constants.database;

export const databaseProviders = [
  {
    provide: DB_HOSTURL,
    useFactory: () => {
      const db = new Database({
        url: DB_HOSTURL,
        databaseName: DB_NAME,
      });
      db.useBasicAuth(DB_USERNAME, DB_PASSWORD);
      return db;
    },
  },
];
