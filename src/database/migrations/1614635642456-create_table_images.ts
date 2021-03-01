import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableImages1614635642456 implements MigrationInterface {
    name = 'createTableImages1614635642456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "productId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_7af50639264735c79e918af6089" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_7af50639264735c79e918af6089"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
