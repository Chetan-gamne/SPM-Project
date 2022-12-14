import dotenv from 'dotenv';
dotenv.config();

export const constants = {
  database: {
    DB_NAME: process.env.DB_NAME,
    DB_HOSTURL: process.env.DB_HOSTURL,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
  firebaseConfig: {
    FIREBASE_TYPE: process.env.FIREBASE_TYPE,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
    FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
    FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
    FIREBASE_AUTH_PROVIDER_X509: process.env.FIREBASE_AUTH_PROVIDER_X509,
    FIREBASE_CLIENT_X509: process.env.FIREBASE_CLIENT_X509,
  },
  aws: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
  mail: {
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER_KEY: process.env.MAIL_USER_KEY,
    MAIL_USER_PASSWORD: process.env.MAIL_USER_PASSWORD,
  },
};
