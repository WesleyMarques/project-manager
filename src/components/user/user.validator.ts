import * as Joi from 'joi';
import { IUser } from './user.model';

class UserValidation{
    createUser(user: IUser) : Joi.ValidationResult<IUser>{
        const schema : Joi.Schema = Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().required().email(),
            password: Joi.string(),
        })

        return Joi.validate(user, schema)
    }
}


export default new UserValidation()