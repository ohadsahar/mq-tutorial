import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import nocache from 'nocache'
import 'reflect-metadata'
import APIRouter from './api/routes'
import bootstrapDb from './config/db.config'
import getConfig from './config/env.config'
import Logger from './config/logger.config'
import useragent from 'express-useragent';
import {Container} from "typedi";
import {MqService} from "./api/services/mq.service";

const mqService = Container.get(MqService);

const config = getConfig();
Logger.info("Starting server...");
Logger.info(`Env: ${config.name}`);
const app = express();

app.use(useragent.express());
app.use(helmet());
app.use(cors());
app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(config.logLevel || 'tiny'));

app.use(APIRouter);

async function init() {
    let db = await bootstrapDb();
    if (db) {
        Logger.info("DB is connected");
        Logger.info(config.dbHost);
    } else {
        Logger.error("Cannot connect to db. this could be fatal");
    }
    app.listen(config.port || 8282, () =>
        Logger.info(`Server listening on port ${config.port || 8282}. Enjoy!`));
    mqService.initMq();
}

init();

export default app;
