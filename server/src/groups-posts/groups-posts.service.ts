import { Injectable } from '@nestjs/common';
import {Repository} from "../../myOrm/repository";
import {IPost} from "../users/users.service";

@Injectable()
export class GroupsPostsService {
    constructor() {
        this.postsRepository = new Repository(`GROUPS_POST`)
        this.groupRepository = new Repository(`GROUP`)
    }

    private postsRepository: Repository
    private groupRepository: Repository

    async getAllPosts(): Promise<IPost[]> {
        return this.postsRepository.find().then(res => res.rows)
    }

    async publishPost(post: IPost): Promise<boolean> {
        const creator = await this.groupRepository.findOne({ id: post.creatorId })
        if (!creator) return false

        try {
            await this.postsRepository.query(`
                INSERT INTO "GROUPS_POST" (TITLE, CONTENT, DATE_OF_CREATION, CREATOR_ID)
                VALUES ('${post.title}', '${post.content}', '${post.dateOfCreation}', (SELECT ID FROM "GROUP" WHERE ID = ${creator.id}));
            `)

            return true
        } catch (e) {
            return false
        }
    }
}
