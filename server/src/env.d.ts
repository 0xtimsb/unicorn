declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    SUPER_USER_ID: number;
  }
}

declare namespace Express {
  export interface Session {
    userId: number;
  }
}
