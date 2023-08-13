/*
  Warnings:

  - Added the required column `statusId` to the `Tiket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `Tiket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Tiket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tiket` ADD COLUMN `statusId` INTEGER NOT NULL,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Tiket` ADD CONSTRAINT `Tiket_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
