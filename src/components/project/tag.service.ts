import * as Joi from 'joi';
import { User } from '../user/user.model';
import { Tag, Project, Project_Tag } from './project.model';
// import userValidator from './user.validator'
// import { User, IUser } from "./user.model";

export default {
    async create(payload: any[]): Promise<Tag[]> {
        return new Promise<Tag[]>(async (resolve, reject) => {
            let projectTags: Tag[] = []
            for await (const element of payload) {
                let newTag = await this.fetchByName(element)
                if (newTag == null) {
                    newTag = await Tag.create({
                        name: element
                    })
                }
                projectTags.push(newTag)
            }
            resolve(projectTags)
        })
    },
    async fetchByName(name: string): Promise<Tag> {
        return Tag.findOne({
            where: {
                name: name
            }
        })
    }
}