### Understanding Drizzle orm
```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit

```

### Creating a configuration for DB connection

```env
DATABASE_URL=[postgres](postgres://postgres:password@localhost:5432/postgres)

```

### creating a drizzle.config.ts
- dialect => this specifies which type of db you are using e.g 'mysql' | 'sqlite' | 'turso'
- schema => this where the shema will be it is a path e.g src/path
- out => this is where the migration will be 
- dbCredentials => this is the connection for the db
- verbose set to true helps when we run migrations to tell us what things will be changing
- strict set to true asks you when running migrations to see if you allow it
```ts 

import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./src/**/*.sql.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true
});

```

### Then after that we create a shcema
- "user" that is the table name
- serial this specifies which type of data will be the id it can also be uuuid
- primaryKey() this set a row as the primary key
- notNull() specifies that a row can't be null
- varchar("password", { length: 255 }) specifies row will cary characters and length will be 255

```ts
import {
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

 export const user = pgTable("user", {
  id: serial("id").notNull().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
```
### Create a file for migration

```ts 
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});
async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./drizzle",
  });
  await migrationClient.end();
}

main();


```
### Syncing up the database
```bash 
 npx drizzle-kit push

```

### Running Migrations 

```bash
npx drizzle-kit migrate
```


### Opening browser to view our database in drizzle Studio

```bash
npx drizzle-kit studio
```

### Dropping all the migrations file  

```bash
npx drizzle-kit drop
```
- also we can create a migrate.ts then we run the migration using:
```bash
tsx tsx src/drizzle/migrate.ts
```

```ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL!, {
  max: 1,
});
async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./drizzle",
  });
  await migrationClient.end();
}

main();

```
