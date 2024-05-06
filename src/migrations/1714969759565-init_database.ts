import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1714969759565 implements MigrationInterface {
    name = 'InitDatabase1714969759565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "init_date" date NOT NULL, "end_date" date NOT NULL, "userId" integer, "roomId" integer, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "num_beds" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "num_people" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_73fa8fb7243b56914e00f8a0b14" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_73fa8fb7243b56914e00f8a0b14"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "num_people"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "num_beds"`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "type" character varying(44) NOT NULL`);
        await queryRunner.query(`DROP TABLE "reservations"`);
    }

}
