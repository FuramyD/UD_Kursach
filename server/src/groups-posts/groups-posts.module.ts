import { Module } from '@nestjs/common';
import { GroupsPostsService } from './groups-posts.service';
import { GroupsPostsController } from './groups-posts.controller';

@Module({
  providers: [GroupsPostsService],
  controllers: [GroupsPostsController]
})
export class GroupsPostsModule {}
