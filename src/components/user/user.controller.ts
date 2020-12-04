import { Request, Response, NextFunction } from 'express';
import HttpError from "../../config/error";
import { User } from "./user.model";
import userService from './user.service'

export class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = await userService.create(req.body);
      res.status(201).json({ message: "User created with Success" }).end();
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }

  async fetchOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(201).json(res.locals.user).end()
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }
}

export default new UserController();