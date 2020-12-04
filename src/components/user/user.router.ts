import * as express from 'express';
import UserController from './user.controller';


const userAPI = express.Router()
    .get('/', UserController.findAll)
    // .get('/:id', ComplainController.findById)
    // .delete('/:id', ComplainController.remove)
    // .put('/:id', ComplainController.replace)
    // .patch('/:id', ComplainController.update)

const userRegistry = express.Router()
    .post('/', UserController.create)

export {
    userAPI,
    userRegistry
}