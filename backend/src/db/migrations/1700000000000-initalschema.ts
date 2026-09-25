import { MigrationInterface, QueryRunner } from "typeorm";

export class Initalschema1700000000000 implements MigrationInterface {
    name = 'Initalschema1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order_id\` int NOT NULL, \`product_id\` int NOT NULL, \`quantity\` int NOT NULL DEFAULT '1', \`price_at_purchase\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`customer_name\` varchar(255) NOT NULL, \`customer_contact\` varchar(255) NOT NULL, \`delivery_address\` varchar(255) NOT NULL, \`total_amount\` int NOT NULL DEFAULT '0', \`status\` enum ('created', 'paid', 'sent', 'delivered', 'canceled') NOT NULL DEFAULT 'created', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`price\` int NOT NULL, \`image_url\` varchar(255) NULL, \`stock\` int NOT NULL DEFAULT '0', \`reserved\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
    }

}
