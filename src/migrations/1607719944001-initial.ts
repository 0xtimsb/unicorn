import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1607719944001 implements MigrationInterface {
    name = 'initial1607719944001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote_post" ("id" SERIAL NOT NULL, "voteStatus" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "postId" integer, CONSTRAINT "PK_b7f5b42bfe9b12e0cf1de3290e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5232e94e5fbf4ccb98467de435" ON "vote_post" ("userId", "postId") `);
        await queryRunner.query(`ALTER TABLE "vote_post" ADD CONSTRAINT "FK_2000a7024afaad50ec8c4529f77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote_post" ADD CONSTRAINT "FK_0b2b630b4afd3f6255188b207f7" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote_post" DROP CONSTRAINT "FK_0b2b630b4afd3f6255188b207f7"`);
        await queryRunner.query(`ALTER TABLE "vote_post" DROP CONSTRAINT "FK_2000a7024afaad50ec8c4529f77"`);
        await queryRunner.query(`DROP INDEX "IDX_5232e94e5fbf4ccb98467de435"`);
        await queryRunner.query(`DROP TABLE "vote_post"`);
    }

}
