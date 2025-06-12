import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationDocument, ReservationEntity } from './entities/reservation.entity';
import { Model } from 'mongoose';
import { SlotDocument, SlotEntity } from '../slot/entities/slot.entity';

@Injectable()
export class ReservationService {
  constructor(@InjectModel(ReservationEntity.name) private readonly reservationModel: Model<ReservationDocument>,
   @InjectModel(SlotEntity.name) private readonly slotModel: Model<SlotDocument>){}


  async create(createReservationDto: CreateReservationDto):Promise<ReservationEntity> {
    const reservation= new this.reservationModel({
      ...createReservationDto,
      createdAt: new Date(createReservationDto.createdAt)
    })
      await this.slotModel.findByIdAndUpdate(
    createReservationDto.slotId,
    { $inc: { bookedPlaces: createReservationDto.bookedPlaces } },
    { new: true }
  );
    return reservation.save();
  }

  findAll() {
    return this.reservationModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  async remove(id: string): Promise<ReservationEntity> {
  const reservation = await this.reservationModel.findById(id).exec();
  if (!reservation) {
    // throw new NotFoundException(`Reservation with id ${id} not found`);
  }

  await this.reservationModel.findByIdAndDelete(id).exec();

  await this.slotModel.findByIdAndUpdate(
    reservation.slotId,
    { $inc: { bookedPlaces: -reservation.bookedPlaces } },
    { new: true }
  );

  return reservation;
}

 async findBetweenDates(startDate: Date, endDate: Date): Promise<ReservationEntity[]> {
    return this.reservationModel.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).exec();
  }

}
