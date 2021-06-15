import { Module } from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {UsersPostsModule} from "../users-posts/users-posts.module";
import {UsersPostsService} from "../users-posts/users-posts.service";

@Module({
    imports: [UsersPostsModule],
    exports: [],
    controllers: [UsersController],
    providers: [UsersService, UsersPostsService]
})
export class UsersModule {}
