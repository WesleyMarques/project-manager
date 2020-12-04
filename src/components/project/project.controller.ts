import { Request, Response, NextFunction } from 'express';
import { Project } from './project.model';
import HttpError from '../../config/error';
import projectService from './project.service'

export class ProjectController {

  async fetchAll(req: Request, res: Response, next: NextFunction) {
    try {
      const projects: Project[] = await projectService.fetchAll(res.locals.user.id)
      res.status(201).json(projects).end()
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
        const projectSaved: Project = await projectService.create(req.body, res.locals.user);
        res.status(201).json({ message: "Project created with Success" }).end();
      } catch (error) {
        next(new HttpError(error.message.status, error.message));
       }
  }
}

export default new ProjectController();