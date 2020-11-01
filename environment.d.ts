declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DBNAME: string;
      DB_PORT: number;
      JWT_SECRET: string;
    }
  }
}

export {};
