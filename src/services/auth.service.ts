import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces';
import { Users } from 'src/database/models';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Users) private users: typeof Users) {}

  /**
   * @description Function to save user information
   * @argument {Pick<IUser, 'name' | 'email' | 'password'>}
   * @returns {this.users}
   */
  saveUser(userData: Pick<IUser, 'name' | 'email' | 'password'>) {
    return this.users.create(userData);
  }

  /**
   * @description function to get user details
   * @param userData
   * @returns
   */
  getUserDetails(userData: Partial<Pick<IUser, 'name' | 'email'>>) {
    return this.users.findOne({
      where: userData,
      attributes: ['name', 'id', 'email', 'password'],
    });
  }
}
