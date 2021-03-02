import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnPriceToDecimalInTableProducts1614701027556 implements MigrationInterface {
    name = 'changeColumnPriceToDecimalInTableProducts1614701027556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric(7,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL`);
    }

}
