import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { Application } from "express";
import bodyParser from "body-parser";
import api from './routes/constructors/api.router.const';
import routes from './routes/constructors/router.const';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api",api);

app.use("/", routes);

export default app;

