/*
  Warnings:

  - You are about to alter the column `CalefaccionIndividual` on the `propiedad` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `propiedad` MODIFY `CalefaccionIndividual` BOOLEAN NOT NULL;
