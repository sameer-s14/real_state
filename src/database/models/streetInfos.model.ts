import { Properties } from './property.model';
import {
  Column,
  Table,
  ForeignKey,
  DataType,
  Model,
} from 'sequelize-typescript';

@Table({ modelName: 'street_infos', underscored: true })
export class StreetInfos extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Properties)
  @Column({ type: DataType.NUMBER, allowNull: false })
  propertyId: number;

  @Column({ type: DataType.BIGINT, allowNull: true })
  streetWidth: number;

  @Column({ type: DataType.BIGINT, allowNull: true })
  position: number;

  @Column({ type: DataType.BIGINT, allowNull: true })
  facingTypeId: number;
}
