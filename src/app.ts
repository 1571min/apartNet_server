import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import middleware from './middleware';
import helmet from 'helmet';
import { createDatabaseConnection } from "./database";

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.setDatabase();
    this.initializeMiddlewares();
  }

  private async setDatabase(): Promise<void> {
    try {
      await createDatabaseConnection();
      console.log('db 정상 접속');
    } catch (error) {
      throw  error;
    }
  }

  private async initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(
      session({
        secret: 'moduerun',
        resave: false,
        saveUninitialized: true,
      })
    );

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use('/', router);
    this.app.use(middleware.errorHandler);
  }



  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
