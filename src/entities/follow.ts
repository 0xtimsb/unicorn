import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  Index,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "../entities/user";

@ObjectType()
@Entity()
@Index((follow: Follow) => [follow.user, follow.follower], {
  unique: true,
})
export class Follow extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.followers, { onDelete: "CASCADE" })
  user: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.following, { onDelete: "CASCADE" })
  follower: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
