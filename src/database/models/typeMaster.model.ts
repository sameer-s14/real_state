import { Table, Column, Model } from 'sequelize-typescript';
import { LOCALES } from 'src/constants';

@Table({ modelName: 'type_masters', underscored: true })
export class TypeMaster extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ allowNull: false })
  type: string;

  @Column({ allowNull: false })
  slug: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, defaultValue: LOCALES.ENGLISH })
  locale: LOCALES;

  @Column({ allowNull: false, defaultValue: true })
  isActive: boolean;
}
