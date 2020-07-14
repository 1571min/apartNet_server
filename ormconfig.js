module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  synchronize: false,
  logging: false,
  entities: ['src/database/entity/**/*.ts', 'database/entity/*.js'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: ['src/database/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/subscriber',
  },
};
