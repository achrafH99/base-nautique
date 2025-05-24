import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SlotDocument = SlotEntity & Document;

@Schema()
export class SlotEntity {
  @Prop({ type: Types.ObjectId, ref: 'ActivityEntity', required: true })
  activityId: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  maxPlaces: number;

  @Prop({ default: 0 })
  bookedPlaces: number;
}

export const SlotSchema = SchemaFactory.createForClass(SlotEntity);
