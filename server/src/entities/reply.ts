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

import { User } from "./user";
import { Comment } from "./comment";
import { VoteReply } from "./vote-reply";

@ObjectType()
@Entity()
export class Reply extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  voteStatus: number; // 1 or -1 or 0

  @Field()
  @Column({ default: 0 })
  voteCount: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.replies, { onDelete: "CASCADE" })
  user: User;

  @Field(() => Comment)
  @ManyToOne(() => Comment, (comment) => comment.replies, {
    onDelete: "CASCADE",
  })
  comment: Comment;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tagReplies, { onDelete: "CASCADE" })
  tagUser: User;

  @Field(() => [VoteReply])
  @OneToMany(() => VoteReply, (vote) => vote.reply)
  votes: VoteReply[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
