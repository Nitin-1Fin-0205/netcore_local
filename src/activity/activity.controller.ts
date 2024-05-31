import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AddActivity } from './dto/addActivity.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('Activity')
@Controller('api')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}


  // createActivities(@Body() addActivities: AddActivity[]): string {

  @Post("add/activity")
  @ApiBody({ type: [AddActivity] })
  async addActivity(@Body() addActivityDto: AddActivity[]) {
    return await this.activityService.addActivity(addActivityDto);
  }

}
