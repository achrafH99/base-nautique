import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SlotDocument, SlotEntity } from './entities/slot.entity';
import { Model } from 'mongoose';

@Injectable()
export class SlotService {

  constructor(
    @InjectModel(SlotEntity.name)
    private readonly slotModel: Model<SlotDocument>,
  ) {}

  async create(createSlotDto: CreateSlotDto): Promise<SlotEntity> {
    const slot = new this.slotModel({
      ...createSlotDto,
      startTime: new Date(createSlotDto.startTime),
      endTime: new Date(createSlotDto.endTime),
    });

    return slot.save();
  }

findAll():Promise<SlotEntity[]>{
  return this.slotModel.find();
}

 async findAllByActivity(activityId: string): Promise<SlotEntity[]> {
    return this.slotModel.find({ activityId });
  }

  async update(id: string, updateDto: UpdateSlotDto): Promise<SlotEntity> {
    return this.slotModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async remove(id: string) {
    return this.slotModel.findByIdAndDelete(id);
  }
}
