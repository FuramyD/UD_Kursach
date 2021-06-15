import { Module } from '@nestjs/common';
import {GroupsService} from "./groups.service";
import { GroupsController } from './groups.controller';
import {GroupsPostsModule} from "../groups-posts/groups-posts.module";
import {GroupsPostsService} from "../groups-posts/groups-posts.service";

@Module({
    imports: [GroupsPostsModule],
    controllers: [GroupsController],
    providers: [GroupsService, GroupsPostsService]
})
export class GroupsModule {}
