CREATE TYPE "public"."userRole" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE "postCategory" (
	"postId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	CONSTRAINT "postCategory_postId_categoryId_pk" PRIMARY KEY("postId","categoryId")
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "postTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"averageRating" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"authorId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userPreferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"emailUpdates" boolean DEFAULT false NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userData" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"userRole" "userRole" DEFAULT 'user' NOT NULL,
	CONSTRAINT "userData_email_unique" UNIQUE("email"),
	CONSTRAINT "uniqueNameAndAge" UNIQUE("age","name")
);
--> statement-breakpoint
ALTER TABLE "postCategory" ADD CONSTRAINT "postCategory_postId_postTable_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."postTable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postCategory" ADD CONSTRAINT "postCategory_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postTable" ADD CONSTRAINT "postTable_authorId_userData_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."userData"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userPreferences" ADD CONSTRAINT "userPreferences_userId_userData_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userData"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "emailIndex" ON "userData" USING btree ("email");