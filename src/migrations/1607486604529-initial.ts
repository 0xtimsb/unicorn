import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1607486604529 implements MigrationInterface {
    name = 'initial1607486604529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "voteCount" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "voteCount" DROP DEFAULT`);
    }

}
