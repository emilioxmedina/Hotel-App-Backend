import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAmountColumnInPaymentTable1715585334887 implements MigrationInterface {
    name = 'AddingAmountColumnInPaymentTable1715585334887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
    }

}
