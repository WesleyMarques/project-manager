import { Sequelize } from 'sequelize';
import config from '../env/index';

interface IConnectOptions {
    autoReconnect: boolean;
    reconnectTries: number;
    reconnectInterval: number;
    loggerLevel ? : string;
    useNewUrlParser ? : boolean;
}

const connectOptions: IConnectOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
};

const POSTGRES_URI: string = process.env.NODE_ENV || `postgres://${config.database.POSTGRESDB_URI}/${config.database.POSTGRESDB_NAME}`;

export const db: Sequelize = new Sequelize(POSTGRES_URI)

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
},(error: any) => {
  console.error('Unable to connect to the database:', error);
});
  