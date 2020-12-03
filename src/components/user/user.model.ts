import {
    Model,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
    DataTypes,
} from "sequelize";
import Project from '../project';
import { db } from '../../config/connection/connection'

/**
 * @export
 * @interface IUser
 */
export interface IUser {
    id: number;
    name: string;
    email: string;
}

interface IUserCreationAttributes extends Optional<IUser, "id"> { }

export class User extends Model<IUser, IUserCreationAttributes> implements IUser {
    public id: number;
    public name: string;
    public email: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    },{
        sequelize: db,
        tableName: "user"
    }
);

User.hasMany(Project, { foreignKey: 'ownerId', sourceKey: 'id' });