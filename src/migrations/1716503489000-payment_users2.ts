import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentUsers21716503489000 implements MigrationInterface {
    name = 'PaymentUsers21716503489000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "room_number" integer NOT NULL, "price" numeric(6,2) NOT NULL, "num_beds" integer NOT NULL, "num_people" integer NOT NULL, "occupied" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "payment_type" character varying(50) NOT NULL, "amount" double precision NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "init_date" date NOT NULL, "end_date" date NOT NULL, "usersId" integer, "roomsId" integer, "payment_id" integer, CONSTRAINT "REL_8aa71fd109780d24ba0ded765a" UNIQUE ("payment_id"), CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "lastname" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_9a41f625dd2b27b351cf9f46235" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_3fde5fbb41bd376aebd803ea29c" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_8aa71fd109780d24ba0ded765aa" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_8aa71fd109780d24ba0ded765aa"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_3fde5fbb41bd376aebd803ea29c"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_9a41f625dd2b27b351cf9f46235"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
    }

}