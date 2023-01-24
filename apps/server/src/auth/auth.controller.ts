import { Controller, Inject, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import constants from "src/idp/constants";
import {
  IdpUser,
  IIdentityProviderService,
  IUpdateUserRequest,
} from "src/idp/types";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(constants.IDENTITY_PROVIDER_SERVICE)
    private IDPService: IIdentityProviderService,
  ) {}

  @Post("")
  async setCookie(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization;
    try {
      const user = await this.IDPService.verify(token);
      if (!user) {
        res.status(400).json({ msg: "Login Failed" });
      }
      res.cookie("token", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });
      res.status(200).json({ msg: "Successfully login" });
    } catch (error) {
      res.send(400).json({ msg: "Login Failed" });
    }
  }
}
