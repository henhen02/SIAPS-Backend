/*
  Warnings:

  - You are about to drop the `_rolestouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_tikettouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_rolestouser` DROP FOREIGN KEY `_RolesToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_rolestouser` DROP FOREIGN KEY `_RolesToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `_tikettouser` DROP FOREIGN KEY `_TiketToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_tikettouser` DROP FOREIGN KEY `_TiketToUser_B_fkey`;

-- DropTable
DROP TABLE `_rolestouser`;

-- DropTable
DROP TABLE `_tikettouser`;

-- DropTable
DROP TABLE `roles`;

-- CreateTable
CREATE TABLE `Karyawan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `telp` VARCHAR(191) NOT NULL,
    `jabatanId` INTEGER NULL,

    UNIQUE INDEX `Karyawan_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_KaryawanToTiket` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_KaryawanToTiket_AB_unique`(`A`, `B`),
    INDEX `_KaryawanToTiket_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Karyawan` ADD CONSTRAINT `Karyawan_jabatanId_fkey` FOREIGN KEY (`jabatanId`) REFERENCES `Jabatan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KaryawanToTiket` ADD CONSTRAINT `_KaryawanToTiket_A_fkey` FOREIGN KEY (`A`) REFERENCES `Karyawan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KaryawanToTiket` ADD CONSTRAINT `_KaryawanToTiket_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tiket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
