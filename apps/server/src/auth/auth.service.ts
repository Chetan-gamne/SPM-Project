import { Inject, Injectable } from "@nestjs/common";
import constants from "src/idp/constants";
import {
  IdpUser,
  IIdentityProviderService,
  IUpdateUserRequest,
} from "src/idp/types";
import { CreateUserInput } from "./dto/input/createUser.input";
import { ResponseDTO } from "./dto/response.dto";
import { UserService } from "src/user/user.service";
import { Roles } from "./roles.enum";
@Injectable()
export class AuthService {
  constructor(
    @Inject(constants.IDENTITY_PROVIDER_SERVICE)
    private IDPService: IIdentityProviderService,
    private userService: UserService,
  ) {}
  async register(args: CreateUserInput): Promise<IdpUser | string> {
    try {
      let user = await this.userService.getUserByEmail(args.email);

      console.log(user);

      if (user) {
        throw new Error("User Already register! Plz Login");
      }

      let data = {
        ...args,
        emailVerified: false,
        roles: Roles.Customer,
      };
      let idpUser = await this.IDPService.createUser(data);
      const { password, ...rest } = args;
      let dbUser = {
        ...rest,
        idpService: "Firebase",
        idpId: idpUser.id,
        timestamp: new Date(Date.now()),
      };

      await this.userService.createUser(dbUser);
      return idpUser;
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(email: string): Promise<ResponseDTO | null> {
    try {
      const url = await this.IDPService.generateEmailVerificationLink(email);
      if (!url) {
        console.log("in block");
        throw new Error(
          "Unable to Generate Link at this moment! try again latter",
        );
      }
      // Logic to send mail through mail module
      let result: ResponseDTO = { msg: url };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<ResponseDTO | null> {
    try {
      const url = await this.IDPService.generatePasswordResetLink(email);
      // Logic to send mail through mail module
      if (!url) {
        throw new Error(
          "Unable to Generate Link at this moment! try again latter",
        );
      }

      let result: ResponseDTO = { msg: url };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(
    email: string,
    request: IUpdateUserRequest,
  ): Promise<ResponseDTO | null> {
    try {
      let user = await this.IDPService.getUserByEmail(email);
      await this.IDPService.updateUser(user.id, request);
      let result: ResponseDTO = { msg: "Password Updated SuccessFully" };
      return result;
    } catch (error) {
      throw error;
    }
  }
}
