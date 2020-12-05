import { Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from '../entities/user';

@ObjectType()
@Entity()
export class Follow extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.followers)
  user: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.following)
  follower: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}