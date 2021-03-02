import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNameToProducts1614699041551 implements MigrationInterface {
  name = 'addNameToProducts1614699041551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
  }
}
