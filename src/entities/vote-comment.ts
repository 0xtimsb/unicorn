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
import { Comment } from "./comment";

@ObjectType()
@Entity()
export class VoteComment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.votes, { onDelete: "CASCADE" })
  user: User;

  @Field(() => Comment)
  @ManyToOne(() => Comment, (comment) => comment.votes, { onDelete: "CASCADE" })
  comment: Comment;

  @Field()
  @Column()
  voteStatus: number; // 1 or -1 or 0

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
