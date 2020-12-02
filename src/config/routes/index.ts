import * as express from 'express';
import * as http from 'http';

import complainComponent from '../../components/complain';
import swaggerRouter from '../swagger/swagger.routes';

/**
 * @export
 * @param {express.Application} app
 */
export default function routes(app: express.Application): void {
        
    app.use('/api/v1/complain', complainComponent);

    app.use('/api/v1/docs', swaggerRouter);

    /** 
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });
}
