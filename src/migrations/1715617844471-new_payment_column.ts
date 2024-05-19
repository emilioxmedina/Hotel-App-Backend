import { MigrationInterface, QueryRunner } from "typeorm";

export class NewPaymentColumn1715617844471 implements MigrationInterface {
    name = 'NewPaymentColumn1715617844471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "user" jsonb`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_c66c60a17b56ec882fcd8ec770b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_c66c60a17b56ec882fcd8ec770b"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
