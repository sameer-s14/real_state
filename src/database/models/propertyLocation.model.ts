import { Properties } from 'src/database/models';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ modelName: 'property_locations', timestamps: true, underscored: true })
export class PropertyLocation extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Properties)
  @Column({ type: DataType.NUMBER, allowNull: false })
  propertyId: number;

  @Column({ type: DataType.STRING })
  landmark: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  latitude: string;

  @Column({ type: DataType.STRING })
  longitude: string;

  @Column({ type: DataType.BOOLEAN })
  exactLocation: boolean;

  @Column({ type: DataType.NUMBER })
  cityId: number;

  @Column({ type: DataType.NUMBER })
  stateId: number;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @Column({ type: DataType.DATE })
  deletedAt: Date;

  @BelongsTo(() => Properties)
  properties: Properties;
}
