import * as express from 'express';
import UserController from './user.controller';


export default express.Router()
    .post('/', UserController.create)
    .get('/', UserController.findAll)
    // .get('/:id', ComplainController.findById)
    // .delete('/:id', ComplainController.remove)
    // .put('/:id', ComplainController.replace)
    // .patch('/:id', ComplainController.update)