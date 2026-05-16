import {
  integer,
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  index,
  unique,
  boolean,
  real,
  primaryKey,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("userRole", ["admin", "user"]);

export const userTable = pgTable(
  "userData",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: userRole("userRole").default("user").notNull(),
    location: varchar("location", { length: 250 }),
  },
  (table) => {
    return {
      emailIndex: index("emailIndex").on(table.email),
    };
  },
);

export const userPreferences = pgTable("userPreferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailUpdates: boolean("emailUpdates").notNull().default(false),
  userId: uuid("userId")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const postTable = pgTable("postTable", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  avarageRating: real("averageRating").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  authorId: uuid("authorId")
    .references(() => userTable.id)
    .notNull(),
});

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const PostCategoryTable = pgTable(
  "postCategory",
  {
    postId: uuid("postId")
      .references(() => postTable.id)
      .notNull(),
    categoryId: uuid("categoryId")
      .references(() => category.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  },
);
