import "reflect-metadata";
import "dotenv-safe/config";

import { createConnection } from "typeorm";

import path from "path";
// import cors from 'cors';

import express from "express";
import { ApolloServer } from "apollo-server-express";

import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";

import { __prod__, COOKIE_NAME } from "./constants";
import { createSchema } from "./utils/create-schema";

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    logging: true,
    // synchronize: true, // Because, we did migrations!
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [path.join(__dirname, "./entities/*")],
  });

  await connection.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy", 1); // For NGIX in prod.

  // app.use(cors({
  //   origin: process.env.CORS_ORIGIN,
  //   credentials: true,
  // }));

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax", // csrf
        secure: __prod__, // Cookie only works in https.
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  app.listen(parseInt(process.env.PORT), () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    )
  );
};

main().catch((err) => {
  console.error(err);
});
