import {db} from "./encore.service"

export async function checkDataBaseConnection(){
     try{
          await db.queryRow`SELECT 1`
          console.log("Database connection successfully!")
          return "DB connection is successfully"
     }
     catch(error){
          console.log("Database connection failed: ", error)
          throw new Error("DB connection failed")
     }
}