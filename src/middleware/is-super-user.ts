import { MiddlewareFn } from "type-graphql";
import { context } from "../types";

import { SUPER_USER_ID } from '../constants';

export const isSuperUser: MiddlewareFn<context> = ({ context }, next) => {
  if (context.req.session.userId !== SUPER_USER_ID) {
    throw new Error("Not super user.");
  }
  return next();
};