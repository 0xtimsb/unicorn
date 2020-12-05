import { MiddlewareFn } from "type-graphql";
import { context } from "../types";

export const isAuth: MiddlewareFn<context> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated.");
  }
  return next();
};