import { Request, Response, NextFunction } from 'express';
import HttpError from "../../config/error";
import { User } from "./user.model";
import userService from './user.service'
import * as jwt from 'jsonwebtoken'
import config from '../../config/env';

export class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // User.build({
      //     name: req.body.name,
      //     email: req.body.email,
      //     password: req.body.password
      // })
      const user: User = await userService.create(req.body);
      res.status(201).json({ message: "User created with Success" });
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<User[]> {
    return await userService.fetchAll()
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Object> {
    const { username, password } = req.body;

    return {
      token: generateAccessToken(username)
    }
  }
}

const generateAccessToken = (username: string) => {
  return jwt.sign(username, config.secret, { expiresIn: '24h' });
}

export default new UserController();