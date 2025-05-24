import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateReservationDto {
  @IsMongoId()
  @IsNotEmpty()
  slotId: string;

  @IsNotEmpty()
  userEmail: string;

  @IsDateString()
  createdAt: string;

}
