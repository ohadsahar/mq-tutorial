import minimist, {ParsedArgs} from 'minimist';
import * as path from 'path';

const argv: ParsedArgs = minimist(process.argv.slice(2));

const constants = {};

export interface IConfig {
    name: string;
    production: boolean;
    logLevel: string;
    serverUrl: string;
    port: number;
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPass: string;
    dbName: string;
    appName: string;
    synchronize: boolean;
    logging: boolean;
    dropSchema: boolean;
}

let config: any;
const init = () => {
    let envPath = path.join(path.dirname(__dirname), 'env');
    switch (argv.env) {
        case 'dev':
        case 'develop':
            config = require(path.join(envPath, 'dev.json'));
            break;
        default:
            config = require(path.join(envPath, 'dev.json'));
            break;
    }
    return Object.assign(config, constants);
};


const getConfig = (): IConfig => {
    return config || init(); //  "exec": "set TS_NODE_TRANSPILE_ONLY=true&ts-node -r tsconfig-paths/register src/app.ts",
};

export default getConfig;
