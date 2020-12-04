import * as Joi from 'joi';
import { types } from 'util';

/**
 * @export
 * @class Validation
 */
abstract class Validation {
    // can`t assign to customJoi any type of Joi Schemas - because of custom field objectId. Need to discuss this
    customJoi: any;

    /**
     * @static
     * @type {string}
     * @memberof JoiSchema
     */
    readonly messageObjectId: string =
        'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';

    /**
     * Creates an instance of Schema.
     * @memberof JoiSchema
     */
    constructor() {
        this.customJoi = Joi.extend({
            name: 'objectId',
            language: {
                base: this.messageObjectId
            },
            pre(
                value: string,
                state: Joi.State,
                options: Joi.ValidationOptions
            ): Object | string {

                return value; // Keep the value as it was
            }
        });
    }
}

export default Validation;