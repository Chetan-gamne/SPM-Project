import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import { constants } from 'src/server.constants';

const {
  FIREBASE_TYPE,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_AUTH_PROVIDER_X509,
  FIREBASE_AUTH_URI,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_X509,
  FIREBASE_TOKEN_URI,
} = constants.firebaseConfig;

const firebase_params = {
  type: FIREBASE_TYPE,
  projectId: FIREBASE_PROJECT_ID,
  privateKeyId: FIREBASE_PRIVATE_KEY_ID,
  privateKey: FIREBASE_PRIVATE_KEY,
  clientEmail: FIREBASE_CLIENT_EMAIL,
  clientId: FIREBASE_CLIENT_ID,
  authUri: FIREBASE_AUTH_URI,
  tokenUri: FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: FIREBASE_AUTH_PROVIDER_X509,
  clientC509CertUrl: FIREBASE_CLIENT_X509,
};

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: 'https://fir-auth-bd895.firebaseio.com',
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.defaultApp
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          const user = {
            email: decodedToken.email,
          };
          req['user'] = user;
          next();
        })
        .catch((error) => {
          console.error(error);
          this.accessDenied(req.url, res);
        });
    } else {
      next();
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
