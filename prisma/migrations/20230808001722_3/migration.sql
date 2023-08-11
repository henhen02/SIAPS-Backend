-- CreateTable
CREATE TABLE `JenisSampel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sampel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JenisSampelToTiket` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_JenisSampelToTiket_AB_unique`(`A`, `B`),
    INDEX `_JenisSampelToTiket_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_JenisSampelToTiket` ADD CONSTRAINT `_JenisSampelToTiket_A_fkey` FOREIGN KEY (`A`) REFERENCES `JenisSampel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JenisSampelToTiket` ADD CONSTRAINT `_JenisSampelToTiket_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tiket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
