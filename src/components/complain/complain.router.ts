import * as express from 'express';
import ComplainController from './complain.controller';


export default express.Router()
    .get('/', ComplainController.list)
    .post('/', ComplainController.create)
    .get('/insights', ComplainController.insigths)
    .get('/:id', ComplainController.findById)
    .delete('/:id', ComplainController.remove)
    .put('/:id', ComplainController.replace)
    .patch('/:id', ComplainController.update)
