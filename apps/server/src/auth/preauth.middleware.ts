import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import * as ServiceAccount from './spmdemo-dcf07-firebase-adminsdk-q6ly7-f91baace94.json';

const firebaseConfig = {
  type: ServiceAccount.type,
  projectId: ServiceAccount.project_id,
  privateKeyId: ServiceAccount.private_key_id,
  privateKey: ServiceAccount.private_key,
  clientEmail: ServiceAccount.client_email,
  clientId: ServiceAccount.client_id,
  authUri: ServiceAccount.auth_uri,
  tokenUri: ServiceAccount.token_uri,
  authProviderX509CertUrl: ServiceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: ServiceAccount.client_x509_cert_url,
};

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebaseConfig),
      databaseURL: 'https://spmdemo-dcf07.firebaseio.com/',
    });
  }
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
