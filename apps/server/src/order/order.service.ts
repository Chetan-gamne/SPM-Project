import { Inject, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import dbconstants from "src/database/constants";
import { DBService } from "src/database/types";

@Injectable()
export class OrderService {
  private collection;
  constructor(
    @Inject(dbconstants.DATABASE_PROVIDER_SERVICE) private DBService: DBService,
  ) {
    this.collection = "orders";
  }
  async create(createOrderDto: CreateOrderDto | any) {
    return await this.DBService.insertOne(createOrderDto, this.collection);
  }

  async findAll() {
    const orders = await this.DBService.getAllDocs(this.collection);
    return orders;
  }

  async findOne(id: string) {
    const order = await this.DBService.getById(`orders/${id}`, this.collection);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto | any) {
    const order = await this.DBService.updateById(
      id,
      updateOrderDto,
      this.collection,
    );
    return order;
  }

  async remove(id: string) {
    return await this.DBService.deleteOne(id, this.collection);
  }

  async getOrdersByEmail(email: string) {
    return await this.DBService.getByAtrribute("email", email, this.collection);
  }

  async getByAttribute(attribute: string, attributeValue: string) {
    return await this.DBService.getByAtrribute(
      attribute,
      attributeValue,
      this.collection,
    );
  }
}
