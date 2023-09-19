import { Properties } from './property.model';
import {
  Column,
  ForeignKey,
  Table,
  DataType,
  Model,
} from 'sequelize-typescript';

@Table({
  modelName: 'property_attributes',
  underscored: true,
})
export class PropertyAttributes extends Model {
  @Column({ autoIncrement: true, primaryKey: true, allowNull: false })
  id: number;

  @ForeignKey(() => Properties)
  @Column({ type: DataType.INTEGER, allowNull: false })
  propertyId: number;

  @Column({ type: DataType.INTEGER })
  furnishingTypeId: number;

  @Column({ type: DataType.INTEGER })
  facingTypeId: number;

  @Column({ type: DataType.INTEGER })
  roomTypeId: number;

  @Column({ type: DataType.INTEGER })
  unitTypeId: number;

  @Column({ type: DataType.INTEGER })
  currencyTypeId: number;

  @Column({ type: DataType.INTEGER })
  possessionTypeId: number;

  @Column({ type: DataType.INTEGER })
  ownershipTypeId: number;

  @Column({ type: DataType.INTEGER })
  transactionTypeId: number;

  @Column({ type: DataType.DECIMAL })
  builtUpArea: number;

  @Column({ type: DataType.DECIMAL })
  carpetArea: number;

  @Column({ type: DataType.INTEGER })
  residenceTypeId: number;

  @Column({ type: DataType.INTEGER })
  noOfBedrooms: number;

  @Column({ type: DataType.INTEGER })
  noOfBathrooms: number;

  @Column({ type: DataType.INTEGER })
  noOfLivingRooms: number;

  @Column({ type: DataType.INTEGER })
  noOfGuestrooms: number;

  @Column({ type: DataType.INTEGER })
  capacityPerRoom: number;

  @Column({ type: DataType.INTEGER })
  noOfFloors: number;

  @Column({ type: DataType.INTEGER })
  floorNumber: number;

  @Column({ type: DataType.DOUBLE })
  salePrice: number;

  @Column({ type: DataType.DOUBLE })
  expectedRent: number;

  @Column({ type: DataType.DOUBLE })
  securityDepositAmount: number;

  @Column({ type: DataType.BOOLEAN })
  isRentNegotiable: boolean;

  @Column({ type: DataType.DATE })
  possessionDate: Date;

  @Column({ type: DataType.DATE })
  completionYear: Date;

  @Column({ type: DataType.DOUBLE })
  yearlyCharges: number;

  @Column({ type: DataType.INTEGER })
  noOfParkings: number;

  @Column({ type: DataType.INTEGER })
  noOfApartments: number;

  @Column({ type: DataType.DATE })
  leaseContractEndDate: Date;

  @Column({ type: DataType.DOUBLE })
  leaseAmount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  noOfStreet: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  waterMeter: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  electricityMeter: boolean;

  @Column({ type: DataType.INTEGER })
  noOfOffice: number;

  @Column({ type: DataType.DECIMAL })
  landDepth: number;

  @Column({ type: DataType.DECIMAL })
  landLength: number;

  @Column({ type: DataType.INTEGER })
  noOfOpening: number;
}
