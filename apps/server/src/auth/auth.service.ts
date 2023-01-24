import { Inject, Injectable } from "@nestjs/common";
import constants from "src/idp/constants";
import {
  IdpUser,
  IIdentityProviderService,
  IUpdateUserRequest,
} from "src/idp/types";
import { CreateUserInput } from "./dto/input/createUser.input";
import { ResponseDTO } from "./dto/response.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject(constants.IDENTITY_PROVIDER_SERVICE)
    private IDPService: IIdentityProviderService,
  ) {}

  async register(args: CreateUserInput): Promise<IdpUser | null> {
    try {
      let data = {
        ...args,
        emailVerified: false,
        claims: {},
      };
      return this.IDPService.createUser(data);
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
