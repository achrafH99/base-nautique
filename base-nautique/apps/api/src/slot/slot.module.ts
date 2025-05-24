import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotEntity, SlotSchema } from './entities/slot.entity';

@Module({
  imports: [
        MongooseModule.forFeature([
          { name: SlotEntity.name, schema: SlotSchema },
        ]),
      ],
  controllers: [SlotController],
  providers: [SlotService],
})
export class SlotModule {}
