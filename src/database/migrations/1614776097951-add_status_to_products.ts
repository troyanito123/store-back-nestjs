import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusToProducts1614776097951 implements MigrationInterface {
    name = 'addStatusToProducts1614776097951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "status" character varying NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "status"`);
    }

}
