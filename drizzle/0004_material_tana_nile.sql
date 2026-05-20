ALTER TABLE "userTable" RENAME TO "userData";--> statement-breakpoint
ALTER TABLE "userData" DROP CONSTRAINT "userTable_email_unique";--> statement-breakpoint
ALTER TABLE "postTable" DROP CONSTRAINT "postTable_authorId_userTable_id_fk";
--> statement-breakpoint
ALTER TABLE "userPreferences" DROP CONSTRAINT "userPreferences_userId_userTable_id_fk";
--> statement-breakpoint
ALTER TABLE "postTable" ADD CONSTRAINT "postTable_authorId_userData_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."userData"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userPreferences" ADD CONSTRAINT "userPreferences_userId_userData_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userData"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userData" ADD CONSTRAINT "userData_email_unique" UNIQUE("email");