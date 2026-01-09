import "dotenv/config";
import { db } from "../database";
import { users } from "../database/schema/users";

async function main() {
  const result = await db.select().from(users);
  console.log(result);
}

main();
