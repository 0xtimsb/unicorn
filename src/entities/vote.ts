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
  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.votes)
  post: Post;

  @Field()
  @Column({ default: null, nullable: true })
  vote: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
