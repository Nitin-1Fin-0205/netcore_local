import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Module({
  imports: [HttpModule],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
