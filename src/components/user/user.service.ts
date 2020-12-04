import { User } from "./user.model";

export default {
    async create(user: User): Promise<User> {
        return user.save()
    },
    async fetchAll(): Promise<User[]> {
        return User.findAll()
    }
}