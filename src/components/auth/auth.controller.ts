import { Request, Response, NextFunction } from 'express';
// import { User } from "./user.model";
// import userService from './user.service'
import * as jwt from 'jsonwebtoken'
import config from '../../config/env';

export class AuthController {

  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    console.log(username)

    return res.status(200).json({
      token: generateAccessToken(username)
    }).end();
  }
}

const generateAccessToken = (username: string) => {
  return jwt.sign(username, config.secret);
}

export default new AuthController();