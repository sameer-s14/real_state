import { IDbDate } from './common.interface';

export interface IUser extends IDbDate {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}
