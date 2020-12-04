import * as Joi from 'joi';
import { User, IUser } from "../user/user.model";
import userService from '../user/user.service';

import * as jwt from 'jsonwebtoken'
import config from '../../config/env';

export default {
    async authenticate(username: string, password: string): Promise<string> {
        const user: User = await userService.fetchByEmail(username)
        return new Promise<string>((resolve, reject) => {
            if (!user.validPassword(password)) {
                reject("User or password wrong");
            }
            resolve(generateAccessToken(username))
        })
    }
}

const generateAccessToken = (username: string) => {
    return jwt.sign(username, config.secret);
  }