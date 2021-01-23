import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  Column,
  Index,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "./user";
import { Reply } from "./reply";

@ObjectType()
@Entity()
@Index((vote: VoteReply) => [vote.user, vote.reply], {
  unique: true,
})
export class VoteReply extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.replyVotes, { onDelete: "CASCADE" })
  user: User;

  @Field(() => Reply)
  @ManyToOne(() => Reply, (reply) => reply.votes, { onDelete: "CASCADE" })
  reply: Reply;

  @Field()
  @Column()
  voteStatus: number; // 1 or -1 or 0

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
