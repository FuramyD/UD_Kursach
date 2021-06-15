import { Injectable } from '@nestjs/common';
import {IPost} from "./users/users.service";
import {Repository} from "../myOrm/repository";

@Injectable()
export class AppService {

    constructor() {
        this.repository = new Repository('')
    }

    repository: Repository

    getHello(): string {
        return 'Hello World!';
    }

    async getAllPosts(): Promise<IPost[]> {
        return this.repository.query(`
      SELECT TITLE, CONTENT, DATE_OF_CREATION, (CREATOR_ID || 'u') AS CREATOR_ID FROM "USERS_POST"
      UNION ALL
      SELECT TITLE, CONTENT, DATE_OF_CREATION, (CREATOR_ID || 'g') AS CREATOR_ID FROM "GROUPS_POST";
    `).then(res => res.rows)
    }

    async query(q) {
        return this.repository.query(q)
    }
}
