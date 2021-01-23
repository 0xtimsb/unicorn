import { Resolver, FieldResolver, Root, Ctx } from "type-graphql";

import { User } from "../../../entities/user";
import { context } from '../../../types';

@Resolver(User)
export class EmailResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: context) {
    // This is the current user, so allow it.
    if (req.session.userId === user.id) {
      return user.email;
    }
    // Current user wants to see someone elses email.
    return "";
  }
}