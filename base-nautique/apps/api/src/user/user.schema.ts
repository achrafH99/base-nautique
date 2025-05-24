import { SchemaFactory } from '@nestjs/mongoose';
import { UserEntity } from './entities/user.entity';
import { Schema } from 'mongoose';

export const UserSchema = SchemaFactory.createForClass(UserEntity);