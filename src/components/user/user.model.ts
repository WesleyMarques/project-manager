import {
    Model,
    Optional,
    DataTypes,
} from "sequelize";
import * as bcrypt from "bcrypt";
import { Project} from '../project/project.model';
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
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
    }, {
    sequelize: db,
    tableName: "user_manager",
    freezeTableName: true,
    hooks: {
        beforeCreate: (user, options) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
}
);

User.hasMany(Project, { foreignKey: 'ownerId', sourceKey: 'id' });
User.sync({ alter: true })