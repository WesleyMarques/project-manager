import { Application, Request, Response, NextFunction} from 'express';
import * as http from 'http';
import * as jwt from 'jsonwebtoken'

import config from '../env/index';
import * as userComponent from '../../components/user';
import authComponent from '../../components/auth';
import projectComponent from '../../components/project';
import swaggerRouter from '../swagger/swagger.routes';
import userService from '../../components/user/user.service';

/**
 * @export
 * @param {express.Application} app
 */
export default function routes(app: Application): void {
        
    app.use('/api/v1/user', verifyAuth, userComponent.default.userAPI);
    app.use('/api/v1/project', verifyAuth, projectComponent)
    app.use('/api/v1/registry', userComponent.default.userRegistry);
    app.use('/api/v1/auth', authComponent);

    app.use('/api/v1/docs', swaggerRouter);

    /** 
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });
}


const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    // console.log(req)
    const token = authHeader && authHeader.toString().split(' ')[1]
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token.toString(), config.secret, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      console.log(decoded)
      userService.fetchByEmail(decoded.toString()).then((user) => {
        res.locals.user = user
        next();
      }, (error) => {return res.status(500).json({message: error})})
    });
}
