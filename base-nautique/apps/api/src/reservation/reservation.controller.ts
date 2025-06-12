import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import{ReservationEntity} from './entities/reservation.entity'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('between')
async getBetweenDates(
  @Query('start') start: string,
  @Query('end') end: string,
): Promise<ReservationEntity[]> {
  console.log("dans between")
  return this.reservationService.findBetweenDates(new Date(start), new Date(end));
}
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
