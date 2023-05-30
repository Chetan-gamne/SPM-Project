import { Module } from "@nestjs/common";
import { IDPModule } from "src/idp/idp.module";

import { DatabaseModule } from "src/database/database.module";
import constants from "src/database/constants";
import constants2 from "src/idp/constants";
import { StoreResolver } from "./store.resolver";
import { StoreService } from "./store.service";
import { AuthGuard } from "src/auth/auth.guard";

@Module({
  imports: [
    DatabaseModule.forRoot(constants.DATABASE_PROVIDER_ARANGO),
    IDPModule.forRoot(constants2.IDENTITY_PROVIDER_FIREBASE),
  ],
  providers: [StoreService, StoreResolver, AuthGuard],
  exports: [StoreService],
})
export class StoreModule {}
