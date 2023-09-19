import { PropertyLocation } from './propertyLocation.model';
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'properties', timestamps: true, underscored: true })
export class Properties extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.NUMBER, allowNull: false })
  addedBy: number;

  @Column({ type: DataType.NUMBER })
  userTypeId: number;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.STRING })
  currentStep: string;

  @Column({ type: DataType.INTEGER })
  listingTypeId: number;

  @Column({ type: DataType.BOOLEAN })
  isActive: boolean;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @Column({ type: DataType.DATE })
  deletedAt: Date;

  @HasOne(() => PropertyLocation)
  propertyLocation: PropertyLocation;
}
