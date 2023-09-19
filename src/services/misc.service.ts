import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LOCALES } from 'src/constants';
import { Op } from 'sequelize';
import { TypeMaster, Cities, States } from 'src/database/models';

@Injectable()
export class MiscService {
  constructor(
    @InjectModel(TypeMaster) private typeMasters: typeof TypeMaster,
    @InjectModel(Cities) private cities: Cities,
    @InjectModel(States) private states: States,
  ) {}

  /**
   * @description function to fetch type master based on type arrays and locale
   * @param type
   * @param locale
   * @returns {TypeMaster[]}
   */
  getMiscValues(
    type: string[],
    locale: string = LOCALES.ENGLISH,
  ): Promise<TypeMaster[]> {
    const where = {
      // isActive: true,
      locale,
      ...(type?.length && {
        type: {
          [Op.in]: type,
        },
      }),
    };
    return this.typeMasters.findAll({
      where,
      attributes: ['type', 'slug', 'name', 'id'],
      raw: true,
    });
  }

  getStateAndCityData(
    findOptions: {
      pageSize?: number;
      page?: number;
      stateId?: number;
      stateName?: string;
      stateOnly?: boolean;
    },
    includeCities = true,
  ) {
    const includeCitiesModel = !findOptions?.stateOnly ?? includeCities;
    const where: {
      id?: number;
      name?: string;
    } = {};
    if (findOptions?.stateId) {
      where.id = findOptions.stateId;
    }
    if (findOptions?.stateName) {
      where.name = findOptions.stateName;
    }
    const limit = findOptions?.pageSize ? findOptions?.pageSize : 10;
    const pageSize = findOptions?.page ? findOptions?.page : 1;
    const offset = (pageSize <= 1 ? 0 : pageSize - 1) * limit;
    return States.findAll({
      where,
      attributes: ['id', 'name'],
      limit,
      offset,
      ...(includeCitiesModel && {
        include: [
          {
            model: Cities,
            attributes: ['name', 'id'],
          },
        ],
      }),
    });
  }
}
