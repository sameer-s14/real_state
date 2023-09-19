import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { States } from './states.model';

@Table({
  modelName: 'cities',
  underscored: true,
  timestamps: false,
})
export class Cities extends Model {
  @Column({ allowNull: false, primaryKey: true, autoIncrement: true })
  id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: true, type: DataType.STRING })
  code: string;

  @ForeignKey(() => States)
  @Column({ allowNull: false, type: DataType.INTEGER })
  stateId: number;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;
}
