import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "./user";
import { Post } from "./post";

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.votes, { onDelete: "CASCADE" })
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
