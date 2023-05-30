import { Module } from "@nestjs/common";
import constants from "src/idp/constants";
import { IDPModule } from "src/idp/idp.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { MailModule } from "src/mail/mail.module";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [
    IDPModule.forRoot(constants.IDENTITY_PROVIDER_FIREBASE),
    UserModule,
    MailModule,
  ],
  providers: [AuthService, AuthResolver, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
