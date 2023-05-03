import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { OrdersService } from "./orders.service";
import { Orders } from "./models/orders";


@Resolver(() => Orders)
export class OrdersResolver {
  constructor(private readonly OrdersService: OrdersService) {}


  @Query(() => [Orders], { name: 'orders', nullable: 'items' })
  async getOrders(): Promise<any> {
      console.log("Get Orders Query Hit");
      return this.OrdersService.getOrders();
  }
}
