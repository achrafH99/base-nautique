import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSlotDto {
  @IsMongoId()
  @IsNotEmpty()
  activityId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsNumber()
  @Min(1)
  maxPlaces: number;
}
