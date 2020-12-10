import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "./user";
import { Comment } from "./comment";

@ObjectType()
@Entity()
export class Reply extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

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

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
