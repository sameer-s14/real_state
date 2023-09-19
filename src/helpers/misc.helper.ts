import { Injectable } from '@nestjs/common';

@Injectable()
export class MiscHelper {
  /**
   * @description reduce array of object to object
   */
  reduceArray(array: object[]) {
    return array.reduce((acc: object, curr: object & { type: string }) => {
      const { type, ...restValues } = curr;
      acc[type] = acc[type]
        ? [...acc[type], { ...restValues }]
        : [{ ...restValues }];
      return acc;
    }, {});
  }
}
