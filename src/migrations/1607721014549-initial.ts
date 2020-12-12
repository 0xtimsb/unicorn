import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1607721014549 implements MigrationInterface {
    name = 'initial1607721014549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_68697e209ee306767efcfd73e8" ON "follow" ("userId", "followerId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8a6191a111673d2868e4b27f7d" ON "vote_reply" ("userId", "replyId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_850fd745db571631011aaf92ed" ON "vote_comment" ("userId", "commentId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_850fd745db571631011aaf92ed"`);
        await queryRunner.query(`DROP INDEX "IDX_8a6191a111673d2868e4b27f7d"`);
        await queryRunner.query(`DROP INDEX "IDX_68697e209ee306767efcfd73e8"`);
    }

}
