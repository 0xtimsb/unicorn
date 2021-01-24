import { MiddlewareFn } from "type-graphql";
import { context } from "../types";

export const isSuperUser: MiddlewareFn<context> = ({ context }, next) => {
  if (context.req.session.userId !== process.env.SUPER_USER_ID) {
    throw new Error("Not super user.");
  }
  return next();
};
