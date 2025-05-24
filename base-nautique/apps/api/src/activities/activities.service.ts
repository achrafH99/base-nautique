import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ActivityEntity } from './entities/activity.entity';
import { Model } from 'mongoose';

@Injectable()
export class ActivitiesService {

    constructor(
    @InjectModel(ActivityEntity.name)
    private readonly activityModel: Model<ActivityEntity>,
  ) {}

  create(createActivityDto: CreateActivityDto) {
    const activity = new this.activityModel(createActivityDto);
    return activity.save();
  }

  findAll() {
    return this.activityModel.find();
  }

   findById(id: string){
    const activity =  this.activityModel.findById(id).exec();
    if (!activity) {
      throw new NotFoundException(`Activity with id ${id} not found`);
    }
    return activity;
  }



  update(id: string, updateActivityDto: UpdateActivityDto) {
    const updated =  this.activityModel.findByIdAndUpdate(id, updateActivityDto, {
      new: true,
    }).exec();

    if (!updated) {
      throw new NotFoundException(`Activity with id ${id} not found`);
    }

    return updated;
  }

  remove(id: string) {
    return this.activityModel.findByIdAndDelete(id);
  }
}
