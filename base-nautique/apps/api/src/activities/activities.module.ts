import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityEntity } from './entities/activity.entity';
import { ActivitySchema } from './activities.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: ActivityEntity.name, schema: ActivitySchema },
      ]),
    ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
