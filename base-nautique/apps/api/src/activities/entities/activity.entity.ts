import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = ActivityEntity & Document;

@Schema()
export class ActivityEntity {

    @Prop({required:true})
    name:string;

    @Prop({required:true})
    description:string;
    
    @Prop() 
    image: string;
}
