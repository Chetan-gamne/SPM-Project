import { Injectable, Inject } from "@nestjs/common";
import dbconstants from "../database/constants";
import { DBService } from "src/database/types";
import { Product } from "./dto/product.dto";

@Injectable()
export class ProductService {
  private collection;
  constructor(
    @Inject(dbconstants.DATABASE_PROVIDER_SERVICE) private DBService: DBService,
  ) {
    this.collection = "products";
  }

  async createProduct(body: Product): Promise<Product> {
    return this.DBService.insertOne(body, this.collection);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.DBService.getAllDocs(this.collection);
  }

  async updateProduct(_id: string, body: Product): Promise<Product> {
    return await this.DBService.updateById(_id, body, this.collection);
  }

  async getProduct(_id: string): Promise<Product> {
    return await this.DBService.getById(_id, this.collection);
  }

  async deleteProduct(_id: string): Promise<string> {
    const res = await this.DBService.deleteOne(_id, this.collection);
    if (res) return "Product deleted successfully";
  }
}
