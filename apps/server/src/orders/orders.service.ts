import { Inject, Injectable } from "@nestjs/common";
import { DBService } from "src/database/types";
import dbconstants from "../database/constants";
import { Orders } from "./dto/orders.dto";

@Injectable()
export class OrdersService {
  private collection;
  constructor(
    @Inject(dbconstants.DATABASE_PROVIDER_SERVICE) private DBService: DBService,
  ) {
    this.collection = "orders";
  }

  async getOrders(): Promise<Orders[]> {
    const orders = await this.DBService.getAllDocs(this.collection);
    return orders;
  }

}
