import { PrismaClient } from "@prisma/client";

export default class ProductRepository {
  private static db: PrismaClient = new PrismaClient()

  static findAll(where: Object = {}) {
    return this.db.product.findMany(where)
  }
}