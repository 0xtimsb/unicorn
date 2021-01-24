import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  Index,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "./user";
import { Community } from "./community";

@ObjectType()
@Entity()
@Index((member: Member) => [member.user, member.community], {
  unique: true,
})
export class Member extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.communities, { onDelete: "CASCADE" })
  user: User;

  @Field(() => Community)
  @ManyToOne(() => Community, (community) => community.members, {
    onDelete: "CASCADE",
  })
  community: Community;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
