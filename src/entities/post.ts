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
import { Field, Int, ObjectType } from "type-graphql";

import { User } from "./user";
import { Comment } from "./comment";
import { Vote } from "./vote";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field(() => Int, { nullable: true })
  voteStatus: number; // 1 or -1 or null

  @Field(() => Int, { defaultValue: 0 })
  voteCount: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
