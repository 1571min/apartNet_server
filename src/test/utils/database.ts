import { createConnection, ConnectionOptions, useContainer } from 'typeorm';

/**
 * 데이터베이스 커넥션을 생성한다.
 */
export async function createDatabaseTestConnection(): Promise<void> {
  try {
    const connectionOpts: ConnectionOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'lmt1224!!',
      database: 'ApartDB',
      entities: [__dirname + '/../../database/entities/**/*.ts',__dirname + '/../../database/entities/**/*.js'],
    };
    console.log(connectionOpts);
    await createConnection(connectionOpts);
  } catch (error) {
    throw error;
  }
}
