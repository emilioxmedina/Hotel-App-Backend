import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentUsers1715619376358 implements MigrationInterface {
    name = 'PaymentUsers1715619376358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_3dd21505bf38aeefe2e7fe6d404"`);
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "userIdId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "userId" TO "userIdId"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_3dd21505bf38aeefe2e7fe6d404" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
