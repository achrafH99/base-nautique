import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateReservationDto {
  @IsMongoId()
  @IsNotEmpty()
  slotId: string;

  @IsNotEmpty()
  userPhone:string;

  @IsNotEmpty()
  userName:string

  @IsNotEmpty()
  userEmail: string;

  @IsDateString()
  createdAt: string;

  @IsNumber()
  bookedPlaces:number;

}
