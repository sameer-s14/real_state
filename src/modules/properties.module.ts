import { PropertyHelper } from './../helpers/property.helper';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertyController } from './../controllers/property.controller';
import { Module } from '@nestjs/common';
import { PropertyService } from 'src/services';
import {
  Properties,
  PropertyAttributes,
  PropertyLocation,
  StreetInfos,
} from 'src/database/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Properties,
      PropertyLocation,
      PropertyAttributes,
      StreetInfos,
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyHelper],
})
export class PropertyModule {}
