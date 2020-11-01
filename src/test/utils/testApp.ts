import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import {
  useExpressServer,
} from "routing-controllers";

const app = express();

function setExpress() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  useExpressServer(app, {
    cors:true,
    controllers: [__dirname + "/../../controllers/*.ts"],
  });
}

setExpress();

export default app;
