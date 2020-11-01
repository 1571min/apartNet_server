import {MigrationInterface, QueryRunner} from "typeorm";

export class addAllDBtable1600521607944 implements MigrationInterface {
    name = 'addAllDBtable1600521607944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `content` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NULL, `boardId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `board` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NULL, `apartId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `fullName` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `apartIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `apartment` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `apart_address` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `message` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `toId` int NULL, `fromId` int NULL, UNIQUE INDEX `REL_69b470efb1b19aca6e78121449` (`toId`), UNIQUE INDEX `REL_776000050f42ddb61d3c628ff1` (`fromId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_a13ed8d4be35dee61bd3286ac12` FOREIGN KEY (`boardId`) REFERENCES `board`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `board` ADD CONSTRAINT `FK_c9951f13af7909d37c0e2aec484` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `board` ADD CONSTRAINT `FK_15fec24a67393410aa22927d439` FOREIGN KEY (`apartId`) REFERENCES `apartment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_923d52b634c13a78ae6faa260f0` FOREIGN KEY (`apartIdId`) REFERENCES `apartment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_69b470efb1b19aca6e781214490` FOREIGN KEY (`toId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_776000050f42ddb61d3c628ff16` FOREIGN KEY (`fromId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_776000050f42ddb61d3c628ff16`");
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_69b470efb1b19aca6e781214490`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_923d52b634c13a78ae6faa260f0`");
        await queryRunner.query("ALTER TABLE `board` DROP FOREIGN KEY `FK_15fec24a67393410aa22927d439`");
        await queryRunner.query("ALTER TABLE `board` DROP FOREIGN KEY `FK_c9951f13af7909d37c0e2aec484`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_a13ed8d4be35dee61bd3286ac12`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("DROP INDEX `REL_776000050f42ddb61d3c628ff1` ON `message`");
        await queryRunner.query("DROP INDEX `REL_69b470efb1b19aca6e78121449` ON `message`");
        await queryRunner.query("DROP TABLE `message`");
        await queryRunner.query("DROP TABLE `apartment`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `board`");
        await queryRunner.query("DROP TABLE `comment`");
    }

}
