import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldPushIdToTableUser1619554731360 implements MigrationInterface {
    name = 'addFieldPushIdToTableUser1619554731360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "push_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "push_id"`);
    }

}
