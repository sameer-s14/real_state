import { SequelizeModule } from '@nestjs/sequelize';
import { MiscService } from './../services/misc.service';
import { Module } from '@nestjs/common';
import { MiscController } from 'src/controllers/misc.controller';
import { TypeMaster, States, Cities } from 'src/database/models';
import { MiscHelper } from 'src/helpers';

@Module({
  imports: [SequelizeModule.forFeature([TypeMaster, Cities, States])],
  controllers: [MiscController],
  providers: [MiscService, MiscHelper],
})
export class MiscModule {}
