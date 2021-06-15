import { Module } from '@nestjs/common';
import {UsersPostsService} from "./users-posts.service";
import {UsersPostsController} from "./users-posts.controller";

@Module({
    controllers: [UsersPostsController],
    providers: [UsersPostsService]
})
export class UsersPostsModule {}
