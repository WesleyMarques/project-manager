import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface IComplainModel
 * @extends {Document}
 */
export interface IComplainModel extends Document {
    title: String,
    description: String,
    company: String,
    locale: Object,
    transform: () => Object;
}

const ComplainSchema: Schema = new Schema({
    title: String,
    description: String,
    company: String,
    locale: {
        city: String,
        provincy: String,
        country: String
    }
}, {
    collection: 'complain',
    versionKey: false,
    timestamps: true,
    toJSON: {
        transform: (doc: any, ret: any) => {
            delete ret._id;
            delete ret.updatedAt;
        }
    }
});

export default connections.db.model<IComplainModel>('ComplainModel', ComplainSchema);
