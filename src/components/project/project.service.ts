import * as Joi from 'joi';
import { User } from '../user/user.model';
import { Tag, Project, Project_Tag } from './project.model';
import tagService from './tag.service';
// import userValidator from './user.validator'
// import { User, IUser } from "./user.model";

export default {
    async create(payload: any, userLogged: User): Promise<Project> {
        const newTags: Tag[] = await tagService.create(payload.tags)
        
        let newProject = await Project.create({
            description: payload.description,
            ownerId: userLogged.id,
            budget: payload.budget
        })

        newTags.forEach(element => {
            Project_Tag.create({
                ProjectId: newProject.id,
                TagId: element.id
            })
        })
        return new Promise<Project>((resolve, reject) => {
            resolve(newProject)
        })
    },
    async fetchAll(userId: number): Promise<Project[]> {
        return Project.findAll({
            include: [Tag],
            where: {
                ownerId: userId
            }
        })
    },
    // async fetchByEmail(emailValue: string): Promise<User> {
    //     return User.findOne({where: {email: emailValue}})
    // }
}