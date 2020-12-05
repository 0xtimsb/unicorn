import { Resolver, Query, Arg } from "type-graphql";

import { User } from "../../../entities/user";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  user(@Arg("username") username: string) {
    if (!username) {
      return null;
    }
    return User.findOne({ where: { username } });
  }
}