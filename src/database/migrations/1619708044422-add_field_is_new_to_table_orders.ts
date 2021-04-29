import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldIsNewToTableOrders1619708044422 implements MigrationInterface {
    name = 'addFieldIsNewToTableOrders1619708044422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "is_new" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "is_new"`);
    }

}
