-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_jabatanId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `jabatanId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_jabatanId_fkey` FOREIGN KEY (`jabatanId`) REFERENCES `Jabatan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
