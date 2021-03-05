import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMessagesWithRelations1614945840299 implements MigrationInterface {
    name = 'createTableMessagesWithRelations1614945840299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "orderId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_96163d8417c2820f2e8e2e61b2a" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_96163d8417c2820f2e8e2e61b2a"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
