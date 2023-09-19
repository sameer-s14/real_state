import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { Cities } from './cities.model';

@Table({
  modelName: 'states',
  underscored: true,
  timestamps: false,
})
export class States extends Model {
  @Column({ allowNull: false, primaryKey: true, autoIncrement: true })
  id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: true, type: DataType.STRING })
  code: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @HasMany(() => Cities)
  cities: Cities;
}
