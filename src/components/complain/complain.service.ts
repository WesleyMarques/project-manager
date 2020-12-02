import * as Joi from 'joi';
import ComplainModel, { IComplainModel } from './complain.model';
import ComplainValidation from './complain.validator';
import { IComplainsService } from './complain.interface';
import { Types } from 'mongoose';
import { omitBy, isNil } from 'lodash';

/**
 * @export
 * @implements {IComplainModelService}
 */
const ComplainService: IComplainsService = {
    /**
     * @returns {Promise < IComplainModel[] >}
     * @memberof ComplainService
     */
    async list(params:any): Promise < IComplainModel[] > {
        try {
            let { company, city, page = 1, perPage = 50 } = params;
            let options = omitBy({
                company,
            }, isNil);
        
            if (city) {
                options['locale.city'] = { $regex : new RegExp(city, "i") };
            }

            page = parseInt(page)
            perPage = parseInt(perPage)
        
            return await ComplainModel.find(options)
                .sort({
                    createdAt: -1,
                })
                .skip(perPage * (page - 1))
                .limit(perPage)
                .exec();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @returns {Promise < Number >}
     * @memberof ComplainService
     */
    async insigths(params:any): Promise < Number > {
        try {
            const { company, city } = params;
            let options = omitBy({
                company,
            }, isNil);
        
            if (city) {
                options['locale.city'] = { $regex : new RegExp(city, "i") };
            }
        
            return await ComplainModel.find(options)
                .count()
                .exec();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IComplainModel >}
     * @memberof ComplainService
     */
    async findById(id: string): Promise < IComplainModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = ComplainValidation.getComplain({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await ComplainModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IComplainModel} Complain
     * @returns {Promise < IComplainModel >}
     * @memberof ComplainService
     */
    async insert(body: IComplainModel): Promise < IComplainModel > {
        try {
            const validate: Joi.ValidationResult < IComplainModel > = ComplainValidation.createComplain(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const complain: IComplainModel = await ComplainModel.create(body);

            return complain;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IComplainModel >}
     * @memberof ComplainService
     */
    async remove(id: string): Promise < IComplainModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = ComplainValidation.removeComplain({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const complain: IComplainModel = await ComplainModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return complain;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IComplainModel} complain
     * @returns {Promise < IComplainModel >}
     * @memberof ComplainService
     */
    async replace(id: string, body: IComplainModel): Promise < IComplainModel > {
        try {
            const validate: Joi.ValidationResult < IComplainModel > = ComplainValidation.createComplain(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const complain: IComplainModel = await ComplainModel.update({_id: id}, body);

            return complain;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IComplainModel} complain
     * @returns {Promise < IComplainModel >}
     * @memberof ComplainService
     */
    async update(id: string, body: object): Promise < IComplainModel > {
        try {
            const complain: IComplainModel = await ComplainModel.findOne({_id: id});
            complain.set(body);
            await complain.save();

            return complain;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default ComplainService;
