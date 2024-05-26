/*
  Warnings:

  - You are about to drop the column `shoud_attach_users_by_domain` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "shoud_attach_users_by_domain",
ADD COLUMN     "should_attach_users_by_domain" BOOLEAN NOT NULL DEFAULT false;
