import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';
import {
  Properties,
  PropertyAttributes,
  PropertyLocation,
  StreetInfos,
} from 'src/database/models';
import { IProperties, IPropertyLocations } from 'src/interfaces';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Properties) private properties: typeof Properties,
    @InjectModel(PropertyLocation)
    private propertyLocations: typeof PropertyLocation,
    @InjectModel(StreetInfos) private streetInfos: typeof StreetInfos,
    @InjectModel(PropertyAttributes)
    private propertyAttributes: typeof PropertyAttributes,
  ) {}

  /**
   * @description function to save property data
   * @argument {data = Partial<Omit<IProperties, 'createdAt' | 'id' | 'deletedAt'>>}
   * @returns {Properties} properties
   */
  savePropertyDetails(
    data: Omit<IProperties, 'createdAt' | 'id' | 'deletedAt'>,
  ): Promise<Properties> {
    return this.properties.create(data);
  }

  /**
   * @description function to get property details
   * @param where
   */
  getPropertyDetails(
    where: WhereOptions<IProperties>,
    includePropertyLocations = false,
    options: WhereOptions = {},
  ) {
    return this.properties.findOne({
      where,
      ...(includePropertyLocations && { include: PropertyLocation }),
      ...options,
    });
  }

  /**
   * @description Save property Location
   * @param data
   */
  savePropertyLocations(
    data: Omit<IPropertyLocations, 'createdAt' | 'id' | 'deletedAt'>,
  ) {
    return this.propertyLocations.create(data);
  }

  /**
   * @description Get Property Location
   */
  getPropertyLocations(where: WhereOptions<IPropertyLocations>) {
    return this.propertyLocations.findOne({ where });
  }

  saveStreetInfosInBulk(data: Partial<StreetInfos>[]) {
    return this.streetInfos.bulkCreate(data);
  }

  deleteStreetInfos(where: { propertyId: number }) {
    return this.streetInfos.destroy({ where });
  }

  getPropertyAttributesDetails(where: { propertyId: number }) {
    return this.propertyAttributes.findOne({ where });
  }
  savePropertyAttributes(data: Partial<PropertyAttributes>) {
    return this.propertyAttributes.create(data);
  }
}
