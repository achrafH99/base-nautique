// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema()
export class UserEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

   @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

