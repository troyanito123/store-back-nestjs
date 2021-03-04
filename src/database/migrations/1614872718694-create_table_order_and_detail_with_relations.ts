import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableOrderAndDetailWithRelations1614872718694 implements MigrationInterface {
    name = 'createTableOrderAndDetailWithRelations1614872718694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "total" numeric(7,2) NOT NULL DEFAULT '0', "address" character varying NOT NULL, "location" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "details" ("id" SERIAL NOT NULL, "cant" integer NOT NULL, "subtotal" numeric(7,2) NOT NULL DEFAULT '0', "orderId" integer, "productId" integer, CONSTRAINT "PK_02185da47c073158a934d3927dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "details" ADD CONSTRAINT "FK_891e97f8a7a875420118d150e78" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "details" ADD CONSTRAINT "FK_d038e5da5a06a4b0ef85919de41" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "details" DROP CONSTRAINT "FK_d038e5da5a06a4b0ef85919de41"`);
        await queryRunner.query(`ALTER TABLE "details" DROP CONSTRAINT "FK_891e97f8a7a875420118d150e78"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP TABLE "details"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
