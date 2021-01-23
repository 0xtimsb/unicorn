import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { Post } from "./post";
import { User } from "./user";
import { Reply } from "./reply";
import { VoteComment } from "./vote-comment";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  voteStatus: number; // 1 or -1 or 0

  @Field()
  replyCount: number;

  @Field()
  @Column({ default: 0 })
  voteCount: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  post: Post;

  @Field(() => [Reply])
  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];

  @Field(() => [VoteComment])
  @OneToMany(() => VoteComment, (vote) => vote.comment)
  votes: VoteComment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
