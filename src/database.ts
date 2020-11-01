import { createConnection, ConnectionOptions, useContainer } from 'typeorm';
import { env } from './env';

/**
 * 데이터베이스 커넥션을 생성한다.
 */
export async function createDatabaseConnection(): Promise<void> {
  try {
    const connectionOpts: ConnectionOptions = {
      type: 'mysql',
      host: env.database.host,
      port: env.database.port,
      username: env.database.usename,
      password: env.database.password,
      database: env.database.name,
      entities: [__dirname + '/database/entities/**/*.ts',__dirname + '/database/entities/**/*.js'],
    };
    console.log(connectionOpts);
    await createConnection(connectionOpts);
  } catch (error) {
    throw error;
  }
}
