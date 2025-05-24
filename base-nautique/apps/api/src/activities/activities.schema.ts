import { SchemaFactory } from '@nestjs/mongoose';
import { ActivityEntity } from './entities/activity.entity';
import { Schema } from 'mongoose';

export const ActivitySchema = SchemaFactory.createForClass(ActivityEntity);