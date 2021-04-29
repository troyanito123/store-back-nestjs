import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldStatusToTableOrders1619713797026 implements MigrationInterface {
    name = 'addFieldStatusToTableOrders1619713797026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" character varying NOT NULL DEFAULT 'NEW'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
    }

}
