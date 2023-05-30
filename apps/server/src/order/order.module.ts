import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { DatabaseModule } from "src/database/database.module";
import dbConst from "src/database/constants";

@Module({
  imports: [DatabaseModule.forRoot(dbConst.DATABASE_PROVIDER_ARANGO)],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
