import "dotenv/config";

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error/error.ts";
import { logger } from "./middleware/log/isLogged.ts";
import { db } from "./config/config.db.ts";
import { userTable } from "./schema/user.sql.ts";

//configuring interaction with .env secrets
dotenv.config();

//middlewares section
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(errorHandler);

// Port for the server
const PORT = process.env.PORT || 3000;

//inserting our first data
//
async function main() {
  // await db.insert(userTable).values({
  //   name: "Mnyeri",
  //   age: 31,
  //   email: "example.com",
  //   role: "admin",
  //   location: "Nyeri",
  // });

  const user = await db.query.userTable.findMany();
  console.log(user);
}
main();

//Port listening
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
