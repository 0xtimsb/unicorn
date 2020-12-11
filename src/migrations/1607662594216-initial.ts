import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1607662594216 implements MigrationInterface {
    name = 'initial1607662594216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote_reply" ("id" SERIAL NOT NULL, "voteStatus" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "replyId" integer, CONSTRAINT "PK_dc92e7ca6a24ac6d8ea68acf31b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vote_comment" ("id" SERIAL NOT NULL, "voteStatus" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "commentId" integer, CONSTRAINT "PK_b284a674ec7d4e6cf374467a8c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reply" ADD "voteCount" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "voteCount" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "vote_reply" ADD CONSTRAINT "FK_744771758fe36297aed08bc9cfe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote_reply" ADD CONSTRAINT "FK_68ba436189b37c8284a5d6ff1d9" FOREIGN KEY ("replyId") REFERENCES "reply"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote_comment" ADD CONSTRAINT "FK_0977824b6350e028b80edb35d88" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote_comment" ADD CONSTRAINT "FK_591b5731ef7824c577687746f5e" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote_comment" DROP CONSTRAINT "FK_591b5731ef7824c577687746f5e"`);
        await queryRunner.query(`ALTER TABLE "vote_comment" DROP CONSTRAINT "FK_0977824b6350e028b80edb35d88"`);
        await queryRunner.query(`ALTER TABLE "vote_reply" DROP CONSTRAINT "FK_68ba436189b37c8284a5d6ff1d9"`);
        await queryRunner.query(`ALTER TABLE "vote_reply" DROP CONSTRAINT "FK_744771758fe36297aed08bc9cfe"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "voteCount"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP COLUMN "voteCount"`);
        await queryRunner.query(`DROP TABLE "vote_comment"`);
        await queryRunner.query(`DROP TABLE "vote_reply"`);
    }

}
