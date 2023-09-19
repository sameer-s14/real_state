import { MiscHelper } from './../helpers/misc.helper';
import { initResponse, setResponse } from './../utils';
import { MiscService } from './../services/misc.service';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/constants';
import { GetCitiesDto } from 'src/dto';

@Controller('/v1')
@ApiTags(SWAGGER_TAGS.MISC)
export class MiscController {
  constructor(
    private readonly miscService: MiscService,
    private miscHelper: MiscHelper,
  ) {}
  /**
   * @description controller to get type master values
   */
  @Post('/entities-types')
  @ApiOperation({
    summary:
      'This route is used to get type master values based on the types array',
  })
  @ApiBody({
    type: 'object',
    schema: {
      properties: {
        type: {
          type: 'array',
          items: {
            type: 'string',
            example: 'property_furnishing_type',
          },
        },
      },
    },
  })
  async getTypeMasterValues(
    @Body('type') type: string[],
    @Res() res: Response,
  ) {
    const response = initResponse();
    const data = await this.miscService.getMiscValues(type);
    return res
      .status(HttpStatus.OK)
      .json(setResponse(response, this.miscHelper.reduceArray(data)));
  }

  @ApiOperation({
    summary: 'This route is used to get state and cities',
  })
  @Post('/states-cities')
  async getCitiesAndStates(@Body() body: GetCitiesDto, @Res() res: Response) {
    const response = initResponse();
    const data = await this.miscService.getStateAndCityData(body);
    return res.status(HttpStatus.OK).json(setResponse(response, data));
  }
}
