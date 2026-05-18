import "dotenv/config";

import express from "express";
import { count, eq, sql } from "drizzle-orm";

import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error/error.ts";
import { logger } from "./middleware/log/isLogged.ts";
import { db } from "./config/config.db.ts";
import {
  PostCategoryTable,
  userPreferences,
  userTable,
} from "./schema/user.sql.ts";
import { limiter } from "./middleware/helper/limit.ts";

//configuring interaction with .env secrets

//middlewares section
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(errorHandler);
app.use(limiter);

// Port for the server
const PORT = process.env.PORT || 3000;

//inserting our first data
//
async function main() {
  const updatedUser = await db.update(userTable).set({
    age: 30,
  });
  // await db.insert(userPreferences).values({
  //   emailUpdates: true,
  //   userId: "2aab339c-5055-44b8-afec-ee663d436fdf",
  // });

  // await db.insert(userTable).values({
  //   name: "Mnyeri",
  //   age: 31,
  //   email: "example.com",
  //   role: "admin",
  //   location: "Nyeri",
  // });
  // const user = await db.query.userTable.findMany();
  // console.log(user);
  //
  //   await db.delete(userTable);
  //   const newUser = await db
  //     .insert(userTable)
  //     .values([
  //       {
  //         name: "kyle",
  //         age: 29,
  //         email: "test@gmail.com",
  //       },
  //       { name: "sally", email: "sally@email.com", age: 33 },
  //     ])
  //     .returning({
  //       id: userTable.id,
  //       userName: userTable.name,
  //     })
  //     .onConflictDoUpdate({
  //       target: userTable.email,
  //       set: { name: "updated name" },
  //     });
  // console.log(newUser);

  // const gettingData = await db.query.userTable.findMany({
  //   columns: { email: true, name: true },
  //   extras: {
  //     lowerCaseName: sql<string>`lower(${userTable.name})`.as("lowerCaseName"),
  //   },
  //   // //limit: 1,
  //   // with: {
  //   //   preferences: true,
  //   // },
  //   orderBy: (table, { asc }) => asc(table.age),
  // });
  // console.log("Here is the data my friend", gettingData);
  //
  // const usingSelect = await db
  //   .select({
  //     name: userTable.name,
  //     count: count(userTable.name),
  //     // emailUpdates: userPreferences.emailUpdates,
  //   })
  //   .from(userTable)
  //   .groupBy(userTable.name);
  // // .leftJoin(userPreferences, eq(userPreferences.userId, userTable.id));
  // console.log("Using select: ", usingSelect);
  const test = await db.select().from(userTable);
  console.log(test);
}
main();

//Port listening
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
