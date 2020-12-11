import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "./user";
import { Post } from "./post";

@ObjectType()
@Entity()
@Index((vote: VotePost) => [vote.user, vote.post], {
  unique: true,
})
export class VotePost extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.postVotes, { onDelete: "CASCADE" })
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.votes, { onDelete: "CASCADE" })
  post: Post;

  @Field()
  @Column()
  voteStatus: number; // 1 or -1 or 0

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
