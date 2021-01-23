import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../../../entities/user";

@Resolver()
export class EmailExistResolver {
  @Query(() => Boolean)
  async emailExist(
    @Arg("email") email: string,
  ) {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return true;
    }
    return false;
  }
}