import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldIsNewToTableProduct1619706353623 implements MigrationInterface {
    name = 'addFieldIsNewToTableProduct1619706353623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "is_new" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "is_new"`);
    }

}
