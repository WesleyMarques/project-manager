import {
    Model,
    Optional,
    DataTypes,
} from "sequelize";
import * as bcrypt from "bcrypt";
import Project from '../project';
import { db } from '../../config/connection/connection';
import { boolean } from "joi";


/**
 * @export
 * @interface IUser
 */
export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface IUserCreationAttributes extends Optional<IUser, "id"> { }

export class User extends Model<IUser, IUserCreationAttributes> implements IUser {
    public id: number;
    public name: string;
    public email: string;
    public password: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    validPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
      }
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
        password: {
            type: DataTypes.STRING,
        },
    }, {
    sequelize: db,
    tableName: "user",
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }  
}
);

User.hasMany(Project, { foreignKey: 'ownerId', sourceKey: 'id' });

User.sync({ alter: true })