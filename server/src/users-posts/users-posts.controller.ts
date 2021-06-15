import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {UsersPostsService} from "./users-posts.service";
import {Response} from "express";

@Controller('users-posts')
export class UsersPostsController {

    constructor(private postsService: UsersPostsService) {
    }

    @Get('all')
    async findAll(@Res() res: Response) {
        const posts = await this.postsService.getAllPosts()

        if (posts) res.status(HttpStatus.OK).send({ posts })
        else res.status(HttpStatus.CONFLICT).send({ posts: [] })
    }

}
