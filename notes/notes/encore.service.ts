import {Service} from "encore.dev/service";
import {SQLDatabase} from "encore.dev/storage/sqldb";

// declaration for database
export const db = new SQLDatabase("notes_db", {
     migrations: "./migrations",
}
)

export default new Service("notes");