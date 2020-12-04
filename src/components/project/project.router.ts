import * as express from 'express';
import projectController from './project.controller';


export default express.Router()
    .get('/', projectController.fetchAll)
    .post('/', projectController.create)
