import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReservationDocument = ReservationEntity & Document;

@Schema()
export class ReservationEntity {
    @Prop({ required: true })
    userEmail: string;

    @Prop({required:true})
    userPhone: string;
   
    @Prop({required:true})
    userName: string;

    @Prop({ type:Types.ObjectId, ref:'SlotEntity', required: true })
    slotId: Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({required:true})
    bookedPlaces: number;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationEntity);
