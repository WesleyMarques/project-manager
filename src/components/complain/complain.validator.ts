import * as Joi from 'joi';
import Validation from '../validation';
import { IComplainModel } from './complain.model';

/**
 * @export
 * @class ComplainValidation
 * @extends Validation
 */
class ComplainValidation extends Validation {

    /**
     * Creates an instance of ComplainValidation.
     * @memberof ComplainValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IComplainModel} params
     * @returns {Joi.ValidationResult<IComplainModel >}
     * @memberof ComplainValidation
     */
    createComplain(
        params: IComplainModel
    ): Joi.ValidationResult<IComplainModel> {
        const schema: Joi.Schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            company: Joi.string().required(),
            locale: Joi.object().keys({
                city: Joi.string().required(),
                provincy: Joi.string().required(),
                country: Joi.string().required(),
            })
        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof ComplainValidation
     */
    getComplain(
        body: {
            id: string
        }
    ): Joi.ValidationResult<{
        id: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof ComplainValidation
     */
    removeComplain(
        body: {
            id: string
        }
    ): Joi.ValidationResult<{
        id: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new ComplainValidation();
