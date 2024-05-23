import { MigrationInterface, QueryRunner } from "typeorm";

export class Init021716498016472 implements MigrationInterface {
    name = 'Init021716498016472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_73fa8fb7243b56914e00f8a0b14"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "roomId"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "roomsId" integer`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "paymentId" integer`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "UQ_f8dbec76216ec5e4ef78cdecbcf" UNIQUE ("paymentId")`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_9a41f625dd2b27b351cf9f46235" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_3fde5fbb41bd376aebd803ea29c" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_f8dbec76216ec5e4ef78cdecbcf" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_f8dbec76216ec5e4ef78cdecbcf"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_3fde5fbb41bd376aebd803ea29c"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_9a41f625dd2b27b351cf9f46235"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "UQ_f8dbec76216ec5e4ef78cdecbcf"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "paymentId"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "roomsId"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "roomId" integer`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_73fa8fb7243b56914e00f8a0b14" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
