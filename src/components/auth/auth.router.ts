import * as express from 'express';
import AuthController from './auth.controller';


export default express.Router()
    .post('/', AuthController.login)
