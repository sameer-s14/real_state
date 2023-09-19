import { ENVIRONMENTS } from './../constants/config.constants';
import { PropertyAttributes } from './models/propertyAttributes.model';
import { PropertyLocation } from 'src/database/models/propertyLocation.model';
import { Properties, Users, StreetInfos } from 'src/database/models';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DB_CONFIGS_KEYS } from '../constants';
import { Cities, TypeMaster, States } from './models';

export const sequelizeImports = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    logging: false,
    dialect: configService.get(DB_CONFIGS_KEYS.DB_DIALECT),
    host: configService.get(DB_CONFIGS_KEYS.DB_HOST),
    port: +configService.get(DB_CONFIGS_KEYS.DB_PORT),
    username: configService.get(DB_CONFIGS_KEYS.DB_USER),
    password: configService.get(DB_CONFIGS_KEYS.DB_PASSWORD),
    database: configService.get(DB_CONFIGS_KEYS.DB_NAME),
    ...(process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION && {
      dialectOptions: {
        ssl: {
          require: 'true',
        },
      },
      logging: false,
    }),
    models: [
      TypeMaster,
      States,
      Cities,
      Properties,
      Users,
      PropertyLocation,
      PropertyAttributes,
      StreetInfos,
    ],
  }),
  inject: [ConfigService],
});
