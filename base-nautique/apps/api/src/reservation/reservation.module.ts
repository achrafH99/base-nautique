import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationEntity, ReservationSchema } from './entities/reservation.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotEntity, SlotSchema } from '../slot/entities/slot.entity';

@Module({
  imports: [
          MongooseModule.forFeature([
            { name: ReservationEntity.name, schema: ReservationSchema },
            { name: SlotEntity.name, schema: SlotSchema },
          ]),
        ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
