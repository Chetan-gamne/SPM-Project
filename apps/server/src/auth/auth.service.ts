import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Database } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';
import { BaseService } from 'src/database/base.service';
import { IDPService } from 'src/IDP/idp.service';
import { CreateUserDto } from './dto/createUser.dto';
@Injectable()
export class AuthService extends BaseService {
  constructor(
    @Inject('http://127.0.0.1:8529') private readonly db: Database,
    private IDPService: IDPService,
  ) {
    super();
  }

  collection: DocumentCollection = this.db.collection('users');

  async signup(user: CreateUserDto) {
    try {
      const userRecord = await this.IDPService.createUser(user);
      await console.log(userRecord.uid);
      const { password, ...result } = user;

      await this.insertOne({ ...result, _key: userRecord.uid });
      return { msg: 'User Created Successfully!' };
      // .then(async (userRecord) => {
      //   console.log('Successfully created new user:', userRecord.uid);
      //   try {
      //     const { password, ...result } = user;
      //     await this.insertOne({ ...result, _key: userRecord.uid });
      //     return { msg: 'User Created Successfully!' };
      //   } catch (error) {
      //     console.log('signup' + error);
      //     throw new HttpException('Unable To Sign Up', HttpStatus.BAD_GATEWAY);
      //   }
      // });
    } catch (error) {
      throw new HttpException('Unable to Register', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyByToken(token) {
    return await this.IDPService.verify(token);
  }
  async updatePassowrd(uid, data) {
    try {
      const user = await this.IDPService.resetPassword(uid, data);
      console.log('Successfully updated User : ', user.user_id);
      return { msg: 'Successfully Updated Password of user' };
    } catch (error) {
      throw new HttpException(
        'Unable To update Password At this Moment Try again Later',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async forgotPassword(email: string) {
    const msg = await this.IDPService.forgotPassword(email);
    return msg;
  }

  async meData(userId: string) {
    try {
      const user = await this.getByKey(userId);
      console.log(user);
      return user;
    } catch (error) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
