import { Module } from "@nestjs/common";
import constants from "src/database/constants";
import { DatabaseModule } from "src/database/database.module";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [DatabaseModule.forRoot(constants.DATABASE_PROVIDER_ARANGO)],
  providers: [UserService, UserResolver],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
