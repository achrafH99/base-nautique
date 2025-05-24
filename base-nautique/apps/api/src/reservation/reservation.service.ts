import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationDocument, ReservationEntity } from './entities/reservation.entity';
import { Model } from 'mongoose';

@Injectable()
export class ReservationService {
  constructor(@InjectModel(ReservationEntity.name) private readonly reservationModel: Model<ReservationDocument>){}


  create(createReservationDto: CreateReservationDto):Promise<ReservationEntity> {
    const reservation= new this.reservationModel({
      ...createReservationDto,
      createdAt: new Date(createReservationDto.createdAt)
    })
    return reservation.save();
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
