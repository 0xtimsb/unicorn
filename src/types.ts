import { Request, Response } from "express";
import { Redis } from "ioredis";

export interface context {
  req: Request & {
    session: Express.Session;
  };
  res: Response;
  redis: Redis;
}
