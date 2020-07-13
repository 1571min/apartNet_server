import express from 'express';
class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    console.log('this is middleware');
    this.app.get('/', (_req, res) => {
      res.send(200);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
