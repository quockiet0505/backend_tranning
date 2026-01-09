import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { products } from "./products";

export const orderItems = pgTable(
  "order_items",
  {
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id),

    productId: integer("product_id")
      .notNull()
      .references(() => products.id),

    quantity: integer("quantity").notNull(),
  },
  (table) => ({
    pk: primaryKey(table.orderId, table.productId),
  })
);
