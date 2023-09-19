import { IStreetInfo } from 'src/interfaces';

export class PropertyHelper {
  prepareStreetInfoData(streetData: IStreetInfo[], propertyId: number) {
    return streetData.map((item) => ({
      propertyId,
      streetWidth: item?.streetWidth,
      position: item?.position,
      facingTypeId: item?.facingTypeId,
    }));
  }
}
