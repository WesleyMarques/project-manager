import * as Joi from 'joi';
import userValidator from './user.validator'
import { User, IUser } from "./user.model";
import Project from '../project';

export default {
    async create(user: User): Promise<User> {
        const validate: Joi.ValidationResult<IUser> = userValidator.createUser(user);
        if (validate.error) {
            throw new Error(validate.error.message);
        }
        return User.create(user)
    },
    async fetchAll(): Promise<User[]> {
        return User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
    },
    async fetchByEmail(emailValue: string): Promise<User> {
        return User.findOne({ where: { email: emailValue } })
    }
}