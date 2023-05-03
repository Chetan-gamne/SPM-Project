import { Module } from "@nestjs/common";
import constants from "src/database/constants";
import { DatabaseModule } from "src/database/database.module";
import { OrdersService } from "./orders.service";
import {OrdersResolver} from "./orders.resolver"

@Module({
  imports: [DatabaseModule.forRoot(constants.DATABASE_PROVIDER_ARANGO)],
  providers: [OrdersService,OrdersResolver],
  exports: [OrdersService],
})
export class OrdersModule {}
