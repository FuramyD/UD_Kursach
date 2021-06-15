import { Injectable } from '@nestjs/common';
import {IPost} from "../users/users.service";
import {Repository} from "../../myOrm/repository";

@Injectable()
export class UsersPostsService {
    constructor() {
        this.postsRepository = new Repository(`USERS_POST`)
        this.usersRepository = new Repository(`USER`)
    }

    private postsRepository: Repository
    private usersRepository: Repository

    async getAllPosts(): Promise<IPost[]> {
        return this.postsRepository.find().then(res => res.rows)
    }

    async publishPost(post: IPost): Promise<boolean> {
        const creator = await this.usersRepository.findOne({ id: post.creatorId })
        if (!creator) return false

        try {
            await this.postsRepository.query(`
                INSERT INTO "USERS_POST" (TITLE, CONTENT, DATE_OF_CREATION, CREATOR_ID)
                VALUES ('${post.title}', '${post.content}', '${post.dateOfCreation}', (SELECT ID FROM "USER" WHERE ID = ${creator.id}));
            `)

            return true
        } catch (e) {
            return false
        }
    }
}
