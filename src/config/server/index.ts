import '../env';
import * as serverHandlers from './serverHandlers';
import ExpressServer from './ExpressServer';
import routes from '../routes';

const port = parseInt(process.env.PORT);
export default new ExpressServer()
  .router(routes)
  .handler('error', (error: Error) => serverHandlers.onError(error, port))
  .handler('listening', () => serverHandlers.onListening.bind(this))
  .listen(port)
  