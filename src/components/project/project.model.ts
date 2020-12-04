import {
    Association,
    DataTypes,
    Model,
    Optional,
} from "sequelize";
import { db } from '../../config/connection/connection'

/**
 * @export
 * @interface IProject
 */
interface IProject {
    id: number;
    ownerId: number;
    description: string;
    budget: number;
}

interface IProjectCreationAttributes extends Optional<IProject, "id"> { }

interface ITag {
    id: number,
    name: string
}

interface ITagCreationAttributes extends Optional<ITag, "id"> { }

export class Project extends Model<IProject, IProjectCreationAttributes>
    implements IProject {
    public id: number;
    public ownerId: number;
    public description: string;
    public budget: number

    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public readonly tags?: Tag[]; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        projects: Association<Project, Tag>;
    };
}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING,
            allowNull: false,
        },
        budget: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        tableName: "project",
        freezeTableName: true,
    }
)

export class Tag extends Model<ITag, ITagCreationAttributes> implements ITag {
    public id: number;
    public name: string;
}
Tag.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: "tag",
    freezeTableName: true,
})

export const Project_Tag = db.define("project_tag", {}, { timestamps: false });


Project.belongsToMany(Tag, { through: Project_Tag })
Tag.belongsToMany(Project, { through: Project_Tag })

Tag.sync({ alter: true })
Project.sync({ alter: true })
Project_Tag.sync({ alter: true })


