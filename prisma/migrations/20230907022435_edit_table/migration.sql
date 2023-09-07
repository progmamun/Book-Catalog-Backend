/*
  Warnings:

  - You are about to drop the column `publication_date` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `contact_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_img` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contactNo]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicationDate` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNo` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_contact_number_key";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "publication_date",
ADD COLUMN     "publicationDate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "contact_number",
DROP COLUMN "created_at",
DROP COLUMN "full_name",
DROP COLUMN "profile_img",
DROP COLUMN "updated_at",
ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "profileImg" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_contactNo_key" ON "users"("contactNo");
