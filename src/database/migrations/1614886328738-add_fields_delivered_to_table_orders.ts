import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldsDeliveredToTableOrders1614886328738 implements MigrationInterface {
    name = 'addFieldsDeliveredToTableOrders1614886328738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "delivered" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "delivered"`);
    }

}
