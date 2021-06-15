import { Injectable } from '@nestjs/common';
import {Repository} from "../../myOrm/repository";

@Injectable()
export class GroupsService {

    constructor() {
        this.postsRepository = new Repository(`GROUPS_POST`)
        this.groupRepository = new Repository(`GROUP`)
    }

    private postsRepository: Repository
    private groupRepository: Repository

    async findAll(): Promise<IGroup[]> {
        return this.groupRepository.find().then(res => res.rows)
    }

    async createGroup(group: IGroup): Promise<boolean> {
        const gr = await this.groupRepository.findOne({ group_name: group.groupName })
        if (gr) return false

        try {
            await this.groupRepository.insertOne(group)
            return true
        } catch (e) {
            return false
        }
    }

    async deleteGroup(id: number): Promise<boolean> {
        const group = await this.groupRepository.findOne({ id })
        if (!group) return false

        try {
            await this.groupRepository.deleteOne(id)
            return true
        } catch (e) {
            return false
        }
    }
}

export interface IGroup {
    id?: string | number,
    groupName: string,
    description: string
}
