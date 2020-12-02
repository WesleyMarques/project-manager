import * as express from 'express';
import * as Middleware from '../middleware/middleware';
import { Application } from 'express';
import * as http from 'http';
import * as os from 'os';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

export default class ExpressServer {
  app = express();

  constructor() {
    Middleware.configure(this.app);
    Middleware.initErrorHandler(this.app);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(this.app)
    return this;
  }

  listen(p: string | number = process.env.PORT): Application {
    const welcome = (port: any) => () => console.log(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);
    http.createServer(this.app).listen(p, welcome(p));
    return this.app;
  }

  handler(type: string, cb: any) {
    this.app.on(type, cb);
    return this;
  }
}
