import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {Response} from "express";
import {GroupsPostsService} from "./groups-posts.service";

@Controller('groups-posts')
export class GroupsPostsController {
    constructor(private postsService: GroupsPostsService) {
    }

    @Get('all')
    async findAll(@Res() res: Response) {
        const posts = await this.postsService.getAllPosts()

        if (posts) res.status(HttpStatus.OK).send({ posts })
        else res.status(HttpStatus.CONFLICT).send({ posts: [] })
    }
}
