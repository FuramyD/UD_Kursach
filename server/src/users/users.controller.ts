import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {IPost, IUser, UsersService} from "./users.service";
import {Response} from "express";
import {User} from "../../enities/user.entity";
import {UsersPostsService} from "../users-posts/users-posts.service";

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private postsService: UsersPostsService
    ) {}

    @Get('all')
    async getAllUsers(@Res() res: Response): Promise<void> {
        const users = await this.usersService.findAll()
        res.status(HttpStatus.OK).send({ users: users.rows })
    }

    @Get('all-join-connections/:id')
    async getAllUsersWithConnections(@Param() param: { id: string },@Res() res: Response): Promise<void> {
        const users = await this.usersService.findAllJoinConnections(+param.id)
        res.status(HttpStatus.OK).send({ users: users.rows })
    }

    @Post('create')
    async createUser(@Body() user: IUser, @Res() res: Response): Promise<void> {
        console.log(user)
        const isCreated = await this.usersService.createUser(user)
        if (isCreated) res.status(HttpStatus.CREATED).send({ status: 'success' })
        else res.status(HttpStatus.CONFLICT).send({ status: 'failed' })
    }

    @Post('auth')
    async authUser(@Body() authData: { email: string, password: string }, @Res() res: Response): Promise<void> {
        console.log(authData)
        const user = await this.usersService.findOne(authData)
        if (user) res.status(HttpStatus.CREATED).send(user)
        else res.status(HttpStatus.NOT_FOUND).send({ status: 'not found' })
    }

    @Post('post')
    async publishPost(@Body() post: IPost, @Res() res: Response): Promise<void> {
        const isPublished = await this.postsService.publishPost(post)
        if (isPublished) res.status(HttpStatus.CREATED).send({ status: 'Post has been published' })
        else res.status(HttpStatus.CONFLICT).send({ status: 'failed' })
    }

    @Get('find/:id')
    async findOne(@Param() param, @Res() res: Response): Promise<void> {
        const find = await this.usersService.findOneById(+param.id)
        res.status(HttpStatus.OK).send(find)
    }

    @Delete('delete/:id')
    async deleteOne(@Param() param: { id: string }, @Res() res: Response): Promise<void> {
        await this.usersService.remove(+param.id)
        res.status(HttpStatus.OK).send({ status: 'removed' })
    }


    @Get('connections/receive/:id')
    async receiveConnections(@Param() param: { id: string }, @Res() res: Response): Promise<void> {
        const connections = ( await this.usersService.receiveConnections(+param.id) ).rows
        console.log('ids =>', connections)
        const receiveConnections = []
        for (let i = 0; i < connections.length; i++) {
            const {password, ...con} = await this.usersService.findOneById(connections[i].sender_id)
            receiveConnections.push(con)
        }
        console.log(receiveConnections)
        res.status(HttpStatus.OK).send(receiveConnections)

    }

    @Post('connections/send')
    async sendConnection(@Body() body, @Res() res: Response): Promise<void> {
        console.log('senderId:', +body.senderId, 'receiverId: ', +body.receiverId)
        const isSent = await this.usersService.sendConnection(+body.senderId, +body.receiverId)
        if (isSent) res.status(HttpStatus.OK).send({ status: 'sent' })
        else res.status(HttpStatus.CONFLICT).send({ status: 'failed' })
    }

    @Post('connections/confirm')
    async confirmConnection(@Body() body, @Res() res: Response): Promise<void> {
        let acceptCounter = 0
        for (let i = 0; i < body.list.length; i++) {
            const isAccepted = await this.usersService.createConnection(+body.list[i], +body.receiverId)
            if (isAccepted) acceptCounter++
        }
        if (acceptCounter !== 0) res.status(HttpStatus.OK).send({ status: 'confirm', count: acceptCounter })
        else res.status(HttpStatus.CONFLICT).send({ status: 'failed' })
    }

    @Post('connections/delete')
    async deleteConnection(@Body() body: { senderId: number, receiverId: number }, @Res() res: Response): Promise<void> {
        const isDeleted = await this.usersService.removeConnection(+body.senderId, +body.receiverId)

        if (isDeleted) res.status(HttpStatus.OK).send({ status: 'deleted' })
        else res.status(HttpStatus.CONFLICT).send({ status: 'failed' })
    }

    @Get('find-subscriptions/:id')
    async findSubscriptions(@Param() param: { id: string }, @Res() res: Response) {
        const subscriptions = await this.usersService.findSubscriptions(+param.id)

        console.log(subscriptions)
        if (subscriptions) res.status(HttpStatus.OK).send({ subscriptions })
        else res.status(HttpStatus.CONFLICT).send({ subscriptions: [] })
    }

    @Post('subscribe')
    async subscribeOnGroups(@Body() body: { subscriberId: number, list: number[] }, @Res() res: Response) {
        let counter = 0
        for (const groupId of body.list) {
            const subscribed = await this.usersService.subscribeOnGroups(+body.subscriberId, +groupId)
            if (subscribed) counter++
        }

        if (counter !== 0) res.status(HttpStatus.OK).send({ status: 'OK', count: counter })
        else res.status(HttpStatus.CONFLICT).send({ status: 'failed', count: counter })
    }

    @Get('subs-table')
    async getSubsTable(@Res() res: Response) {
        const table = await this.usersService.getSubsTable()

        if (table) res.status(HttpStatus.OK).send({ table })
        else res.status(HttpStatus.CONFLICT).send({ table: [] })
    }
}
