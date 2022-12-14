import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Database } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';
import { CreateUserInput } from './dto/createUser.input';
import { BaseService } from 'src/database/base.service';
import { IDPService } from 'src/IDP/idp.service';
@Injectable()
export class AuthService extends BaseService {
  constructor(
    @Inject('http://127.0.0.1:8529') private readonly db: Database,
    private IDPService: IDPService,
  ) {
    super();
  }

  collection: DocumentCollection = this.db.collection('users');

  // To SignUp User : Calls createUser method in IDPService return msg
  async signup(user: CreateUserInput) {
    try {
      const { password, ...result } = user;
      // firebase Registeration
      const userRecord = await this.IDPService.createUser(user);
      const { uid, metadata, phoneNumber } = userRecord;
      const record = {
        _key: uid,
        ...result,
        phoneNumber: phoneNumber,
        accountCreatedDate: metadata.creationTime,
        roles: ['user'],
      };
      try {
        await this.insertOne(record);
      } catch (error) {
        const response = await this.IDPService.deleteUser(userRecord.uid);
        throw error;
      }
      return { msg: 'User Created Successfully!' };
    } catch (error) {
      throw new HttpException('Unable to Register', HttpStatus.BAD_REQUEST);
    }
  }

  // To Verify token returns an decoded payload
  async verifyByToken(token) {
    return await this.IDPService.verify(token);
  }

  // To update Password with uid and data return message;
  async updatePassowrd(uid, data) {
    try {
      const user = await this.IDPService.resetPassword(uid, data);
      return { msg: 'Successfully Updated Password of user' };
    } catch (error) {
      throw new HttpException(
        'Unable To update Password At this Moment Try again Later',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  // To ForgotPassword with given email
  async forgotPassword(email: string) {
    const msg = await this.IDPService.forgotPassword(email);
    return msg;
  }

  // To return current login user data
  async meData(userId: string) {
    try {
      const user = await this.getByKey(userId);
      return user;
    } catch (error) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
