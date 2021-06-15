import { Injectable } from '@nestjs/common'
import {Repository} from "../../myOrm/repository";


@Injectable()
export class UsersService {
    constructor() {
        this.usersRepository = new Repository(`USER`)
    }

    private usersRepository: Repository

    async sendConnection(senderId: number, receiverId: number): Promise<boolean> {
        const sender = await this.usersRepository.findOne({ id: senderId })
        const receiver = await this.usersRepository.findOne({ id: receiverId })

        if (!sender || !receiver) return false

        sender.receiveConnections = (await this.usersRepository.query(
            `SELECT SENDER_ID FROM "SENT_CONNECTION" WHERE RECEIVER_ID = ${senderId}`
        )).rows
        sender.sentConnections = (await this.usersRepository.query(
            `SELECT RECEIVER_ID FROM "SENT_CONNECTION" WHERE SENDER_ID = ${senderId}`
        )).rows

        sender.connections = (await this.usersRepository.getConnections(senderId)).rows

        if (
            sender.receiveConnections.find(c => c.sender_id === receiver.id) ||
            sender.sentConnections.find(c => c.receiver_id === receiver.id) ||
            sender.connections.find(c => c.id === receiver.id)
        ) return false

        try {
            await this.usersRepository.query(`
            INSERT INTO "SENT_CONNECTION" (SENDER_ID, RECEIVER_ID) VALUES (${senderId}, ${receiverId})`
            )
        } catch (e) {
            return false
        }

        return true
    }

    async receiveConnections(id): Promise<{ rows: { sender_id: number, receiver_id: number }[] }> {
        // return this.usersRepository.query(`SELECT * FROM "USER" CROSS JOIN "SENT_CONNECTION" WHERE "USER".ID = ${id}`)
        return this.usersRepository.query(`SELECT * FROM "SENT_CONNECTION" WHERE RECEIVER_ID = ${id}`)
    }

    async createConnection(senderId: number, receiverId: number): Promise<boolean> {
        const sender = await this.usersRepository.findOne({ id: senderId })
        const receiver = await this.usersRepository.findOne({ id: receiverId })

        console.log(sender)
        console.log(receiver)

        if (!sender || !receiver) return false

        const connections = await this.usersRepository.getConnections(senderId)
        for (const connection of connections.rows) {
            if (connection.user1_id === receiver.id || connection.user2_id === receiver.id) {
                return false
            }
        }

        await this.usersRepository.query(`
            DELETE FROM "SENT_CONNECTION" WHERE SENDER_ID = ${senderId} AND RECEIVER_ID = ${receiverId}
        `)

        await this.usersRepository.query(`
            INSERT INTO "CONNECTION" (USER1_ID, USER2_ID) VALUES (${sender.id}, ${receiver.id})
        `)

        return true
    }

    async removeConnection(senderId: number, receiverId: number): Promise<boolean> {
        const sender = await this.usersRepository.findOne({ id: senderId })
        const receiver = await this.usersRepository.findOne({ id: receiverId })

        if (!sender || !receiver) return false

        const connection = await this.usersRepository.query(`
            SELECT * FROM "CONNECTION" 
            WHERE (USER1_ID = ${senderId} AND USER2_ID = ${receiverId}) 
            OR (USER1_ID = ${receiverId} AND USER2_ID = ${senderId});
        `).then(res => res.rows[0] ?? null)

        if (!connection) return false

        await this.usersRepository.query(`
            DELETE FROM "CONNECTION" 
            WHERE (USER1_ID = ${senderId} AND USER2_ID = ${receiverId}) 
            OR (USER1_ID = ${receiverId} AND USER2_ID = ${senderId});
        `)

        return true
    }

    async createUser(user: IUser): Promise<boolean> {
        const allUsers = ( await this.usersRepository.find() ).rows
        console.log('allUsers', allUsers)
        const findUser = allUsers.find(u => u.phone === user.phone || u.email === user.email)
        if (findUser) return false

        const insert = await this.usersRepository.insertOne(user)
        return !!insert
    }

    async findSubscriptions(userId: number) {
        return this.usersRepository.query(`
            SELECT * FROM "GROUPS_USERS" WHERE USER_ID = ${userId};
        `)
            .then<{group_id: number}[]>(res => res.rows)
            .then<number[]>(res => res.map(el => el.group_id))
    }

    async subscribeOnGroups(subscriberId: number, groupId: number) {
        return this.usersRepository.query(`
            INSERT INTO "GROUPS_USERS" (GROUP_ID, USER_ID)
            VALUES (
                (SELECT ID FROM "GROUP" WHERE ID = ${groupId}),
                (SELECT ID FROM "USER" WHERE ID = ${subscriberId})
            )
        `)
    }

    async getSubsTable() {
        return this.usersRepository.query(`
            SELECT ID AS GROUP_ID, GROUP_NAME, DESCRIPTION, USER_ID FROM "GROUP", "GROUPS_USERS";
        `)
            .then(res => res.rows)
    }

    async findAll(): Promise<{ rows: IUser[] }> {
        return this.usersRepository.find()
    }

    async findAllJoinConnections(id: number): Promise<{ rows: IUser[] }> {
        // return this.usersRepository.find({ relations: ['connections', 'receiveConnections', 'sentConnections'] })
        return this.usersRepository.getConnections(id)
    }

    async findOne(filters): Promise<IUser> {
        return this.usersRepository.findOne(filters)
    }

    async findOneById(id): Promise<IUser> {
        return this.usersRepository.findOne({ id })
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.query(`
            DELETE FROM "SENT_CONNECTION" WHERE SENDER_ID = ${id} OR RECEIVER_ID = ${id};
            DELETE FROM "CONNECTION" WHERE USER1_ID = ${id} OR USER2_ID = ${id};
        `)
        await this.usersRepository.deleteOne(id)
    }
}

export interface IUser {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phone: string,
    connections: IUser[]
}

export interface IPost {
    title: string,
    content: string,
    creatorId: number,
    dateOfCreation: number
}


