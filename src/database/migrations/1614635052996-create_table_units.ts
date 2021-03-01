import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableUnits1614635052996 implements MigrationInterface {
  name = 'createTableUnits1614635052996';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "units" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_47635c1ab22d02fc3ebae3608b8" UNIQUE ("code"), CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "products" ADD "unitId" integer`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_c65251602de2a10b9c6e1af8511" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_c65251602de2a10b9c6e1af8511"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "unitId"`);
    await queryRunner.query(`DROP TABLE "units"`);
  }
}
