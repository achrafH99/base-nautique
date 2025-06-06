import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ActivitiesModule } from '../activities/activities.module';
import { SlotModule } from '../slot/slot.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    MongooseModule.forRoot('mongodb://root:example@92.113.144.117:27017'),
    UserModule,
    AuthModule,
    ActivitiesModule,
    SlotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
