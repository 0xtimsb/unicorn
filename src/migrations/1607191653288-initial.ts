import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1607191653288 implements MigrationInterface {
    name = 'initial1607191653288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" ADD "vote" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "vote"`);
    }

}
