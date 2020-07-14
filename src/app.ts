import express from 'express';
// import config from '../ormconfig';
import { createConnection, getConnectionOptions } from 'typeorm';
import router from './routes/index';
import bodyParser from 'body-parser';
import config from '../ormconfig';

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
  }

  private async initializeMiddlewares() {
    const option = await getConnectionOptions();
    Object.assign(option, config);
    const connection = await createConnection(option);
    if (connection) {
      console.log('database connection :)');
    } else {
      throw Error();
    }
    this.app.use(bodyParser.json());
    this.app.use('/', router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
