import { Users } from './../database/models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './../controllers';
import { Module } from '@nestjs/common';
import { AuthService } from 'src/services';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
