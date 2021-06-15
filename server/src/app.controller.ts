import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Response} from "express";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('posts/all')
    async getAllPosts(@Res() res: Response) {
        const posts = await this.appService.getAllPosts()

        if (posts) res.status(HttpStatus.OK).send({ posts })
        else res.status(HttpStatus.CONFLICT).send({ posts: [] })
    }

    @Post('/api/query')
    async queryDB(@Body() body: { query: string }, @Res() res: Response) {
        const response = await this.appService.query(body.query)
        console.log(body.query)
        res.status(HttpStatus.OK).send(response)
    }
}
