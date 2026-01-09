import { pgTable, serial, integer, date } from "drizzle-orm/pg-core";
import { users } from "./users";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  orderDate: date("order_date").defaultNow(),
});
