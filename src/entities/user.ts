import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { Follow } from "./follow";

import { Post } from "./post";
import { Comment } from "./comment";
import { Reply } from "./reply";

import { VotePost } from "./vote-post";
import { VoteComment } from "./vote-comment";
import { VoteReply } from "./vote-reply";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  birthDate: Date;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];

  @OneToMany(() => Reply, (reply) => reply.user)
  tagReplies: Reply[];

  @OneToMany(() => VotePost, (vote) => vote.user)
  postVotes: VotePost[];

  @OneToMany(() => VoteComment, (vote) => vote.user)
  commentVotes: VoteComment[];

  @OneToMany(() => VoteReply, (vote) => vote.user)
  replyVotes: VoteReply[];

  @Field(() => Boolean, { defaultValue: false })
  followed: boolean;

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.user)
  followers: Follow[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
