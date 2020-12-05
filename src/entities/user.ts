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

import { Post } from "./post";
import { Comment } from "./comment";
import { Follow } from "./follow";
import { Vote } from "./vote";

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

  // @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  // @Field(() => [Follow])
  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  // @Field(() => [Follow])
  @OneToMany(() => Follow, (follow) => follow.user)
  followers: Follow[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
