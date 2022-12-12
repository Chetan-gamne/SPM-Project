import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as firebase from 'firebase-admin';
import { actionCodeSettings } from './constants/action-code';
import * as serviceAccount from './firebaseServiceAccount.json';

const firebase_params = {
  type: serviceAccount.type,
  project_id: serviceAccount.project_id,
  private_key_id: serviceAccount.private_key_id,
  private_key: serviceAccount.private_key,
  client_email: serviceAccount.client_email,
  client_id: serviceAccount.client_id,
  auth_uri: serviceAccount.auth_uri,
  token_uri: serviceAccount.token_uri,
  auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
  client_x509_cert_url: serviceAccount.client_x509_cert_url,
};
@Injectable()
export class IDPService {
  private defaultApp: any;

  constructor(private mailService: MailerService) {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(
        JSON.parse(JSON.stringify(firebase_params)),
      ),
      databaseURL: 'https://spm-demo-6f1c3.firebaseio.com',
    });
  }

  async verify(token): Promise<any> {
    try {
      const decodedToken = await this.defaultApp
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''));
      return decodedToken;
    } catch (error) {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
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

  async createUser(data): Promise<any> {
    try {
      const userRecord = await this.defaultApp.auth().createUser(data);
      return userRecord;
    } catch (error) {
      throw new HttpException(
        'Unable to Register at this moment!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // return await this.defaultApp
    //   .auth()
    //   .createUser(data)
    //   .then((UserRecord) => UserRecord)
    //   .catch((error) => console.log('idpError' + error));
  }

  async resetPassword(uid, data): Promise<any> {
    try {
      const userRecord = await this.defaultApp.auth().updateUser(uid, data);
      return userRecord;
    } catch (error) {
      throw new HttpException(
        'Unable Reset Password at this moment',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    // return await this.defaultApp
    //   .auth()
    //   .updateUser(uid, data)
    //   .then((userRecord) => userRecord)
    //   .catch((error) => console.log(error));
  }

  async forgotPassword(email: string): Promise<any> {
    try {
      const link = await this.defaultApp
        .auth()
        .generatePasswordResetLink(email, actionCodeSettings);
      const sendMail = await await this.mailService.sendMail({
        to: email,
        from: 'spmprojectdemo@gmail.com',
        subject: 'Forgot Password',
        template: 'forgotPassword',
        context: {
          forgot: { link: link },
        },
      });
      const response = await { msg: 'mail has been sent Successfully. Review' };
      return response;
    } catch (error) {
      throw new HttpException(
        'Unable to Configure Forgot Password at this moment!',
        HttpStatus.BAD_REQUEST,
      );
    }
    // return await this.defaultApp
    //   .auth()
    //   .generatePasswordResetLink(email, actionCodeSettings)
    //   .then(async (link) => {
    //     console.log(link);
    //     return await this.mailService
    //       .sendMail({
    //         to: email,
    //         from: 'spmprojectdemo@gmail.com',
    //         subject: 'Forgot Password',
    //         template: 'forgotPassword',
    //         context: {
    //           forgot: { link: link },
    //         },
    //       })
    //       .then(() => ({ msg: 'mail has been sent Successfully. Review' }))
    //       .catch((error) => console.log(error));
    //   });
  }
}
