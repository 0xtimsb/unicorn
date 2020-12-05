import { Resolver, Query, Arg, Int } from "type-graphql";

import { User } from "../../../entities/user";
import { PaginatedUsers } from '../../../objects/paginated-users';

@Resolver()
export class UsersResolver {
  @Query(() => PaginatedUsers, { nullable: true })
  async users(
    @Arg("skip", () => Int) skip: number,
    @Arg("limit", () => Int) limit: number
  ): Promise<PaginatedUsers | null> {
    // Invalid arguments.
    if (limit < 1 || skip < 0) {
      return null;
    }

    limit = Math.min(limit, 50); // Maximum result returned 50.

    const [users, total] = await User.findAndCount({ take: limit, skip });

    const size = users.length;

    return {
      users,
      hasMore: total - (skip + size) !== 0,
    };
  }
}