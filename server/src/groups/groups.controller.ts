import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {IPost} from "../users/users.service";
import {Response} from "express";
import {GroupsPostsService} from "../groups-posts/groups-posts.service";
import {GroupsService, IGroup} from "./groups.service";

@Controller('groups')
export class GroupsController {

    constructor(
        private groupsService: GroupsService,
        private postsService: GroupsPostsService
    ) {}

    @Get('all')
    async findAllGroups(@Res() res: Response) {
        const groups = await this.groupsService.findAll()

        if (groups) res.status(HttpStatus.CREATED).send({ groups })
        else res.status(HttpStatus.CONFLICT).send({ groups: [] })
    }

    @Post('create')
    async createGroup(@Body() body: IGroup, @Res() res: Response) {
        const isCreated = await this.groupsService.createGroup(body)

        if (isCreated) res.status(HttpStatus.CREATED).send({ status: 'created' })
        else res.status(HttpStatus.CONFLICT).send({ status: 'failed' })
    }


    @Post('post')
    async publishPost(@Body() post: IPost, @Res() res: Response): Promise<void> {
        const isPublished = await this.postsService.publishPost(post)
        if (isPublished) res.status(HttpStatus.CREATED).send({ status: 'Post has been published' })
        else res.status(HttpStatus.CONFLICT).send({ status: 'failed' })
    }


    @Delete('delete/:id')
    async deleteGroup(@Param() param: { id: string }, @Res() res: Response) {
        const isDeleted = await this.groupsService.deleteGroup(+param.id)

        if (isDeleted) res.status(HttpStatus.OK).send({ status: 'deleted' })
        else res.status(HttpStatus.CONFLICT).send({ status: 'failed' })
    }

}
