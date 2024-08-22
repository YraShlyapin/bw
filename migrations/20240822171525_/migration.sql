/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tagresenent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tagresenent_name_key` ON `tagresenent`(`name`);

-- RenameIndex
ALTER TABLE `_resedenttotagresenent` RENAME INDEX `_resedentTotagresenent_AB_unique` TO `_resedenttotagresenent_AB_unique`;

-- RenameIndex
ALTER TABLE `_resedenttotagresenent` RENAME INDEX `_resedentTotagresenent_B_index` TO `_resedenttotagresenent_B_index`;
