import { Request, Response, NextFunction } from 'express';
import authRouter from './auth.router';
import authService from './auth.service'

export class AuthController {

  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    
    try {
      const token = await authService.authenticate(username, password)
      console.log("AQUIIIIII succes")
      return res.status(200).json({
        token: token
      }).end();
    } catch (error) {
      console.log("AQUIIIIII")
      return res.status(404).json({
        message: error
      }).end();
    }
  }
}

export default new AuthController();