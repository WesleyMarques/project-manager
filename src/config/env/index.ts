import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        POSTGRESDB_URI: string;
        POSTGRESDB_NAME: string;
    };
    secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {

    },
    secret: process.env.SECRET || '@QEGTUI'
};

const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
    },
    secret: process.env.SECRET || '@QEGTUI'
};

const test: IConfig = {
    port: process.env.PORT || 3000,
    database: {},
    secret: process.env.SECRET || '@QEGTUI'
};

const config: {
    [name: string]: IConfig
} = {
    test,
    development,
    production
};

export default config[NODE_ENV];
