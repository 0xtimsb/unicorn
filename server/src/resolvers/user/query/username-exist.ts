import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../../../entities/user";

@Resolver()
export class UsernameExistResolver {
  @Query(() => Boolean)
  async usernameExist(
    @Arg("username") username: string,
  ) {
    const user = await User.findOne({ where: { username } });

    if (user) {
      return true;
    }
    return false;
  }
}