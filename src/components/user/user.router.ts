import * as express from 'express';
import UserController from './user.controller';


const userAPI = express.Router()
    .get('/', UserController.fetchOne)

const userRegistry = express.Router()
    .post('/', UserController.create)

export {
    userAPI,
    userRegistry
}