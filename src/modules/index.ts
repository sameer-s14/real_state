import { ENVIRONMENTS } from './../constants/config.constants';
import { AppController } from './../controllers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { sequelizeImports } from 'src/database';
import { MiscModule } from './misc.module';
import { JwtModule } from '@nestjs/jwt';
import { PropertyModule } from './properties.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV != ENVIRONMENTS.PRODUCTION
          ? '.env'
          : '.env.production',
    }),
    sequelizeImports,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60h' },
    }),
    MiscModule,
    PropertyModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
