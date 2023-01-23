import { Database } from 'arangojs';

// import { DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

// import {Shared} from '@nestjs/core';

// const DB_CONNECTION_TOKEN = 'db_connection_token';
// const SERVER_CONFIG = 'server_config';

export const databaseProviders = [
  {
    provide: 'http://127.0.0.1:8529',
    useFactory: async () => {
      const db = new Database({
        url: 'http://127.0.0.1:8529',
        databaseName: 'spm',
      });
      db.useBasicAuth('root', 'admin');
      //   let spm_db = db.database('spm');
      console.log(
        'spm:' +
          JSON.stringify(
            db
              .listCollections()
              .then(async (res) => {
                console.log(res);
                const users = db.collection('users');

                try {
                  let userdata = await users.lookupByKeys(['2081']);
                  userdata.map((user) => {
                    console.log(user);
                  });
                } catch (err) {
                  console.log(err);
                }
              })
              .catch((err) => console.log(err)),
          ),
      );
      return db;
    },
  },
];
