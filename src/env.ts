/**
 * NODE_ENV에 따른 .env 파일을 로드한다.
 */
require("dotenv").config({
  path: `../env`,
});

/**
 * 환경 변수
 */
export const env = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  app: {
    port: Number(process.env.PORT) || 8080,
    apiPrefix: process.env.API_PREFIX || "/api",
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 3306,
    usename: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    logging: process.env.TYPEORM_LOGGING === "true",
  },
};
