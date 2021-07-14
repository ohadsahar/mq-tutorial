import Logger from './logger.config';
import mongoose from 'mongoose';
import getConfig from "./env.config";

const bootstrapDb = async () => {
    let conn;
    try {
        conn = await mongoose.connect(getConfig().dbHost,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
    } catch (e) {
        conn = false;
        Logger.error(e.message);
    }
    return conn;
};

export default bootstrapDb;
