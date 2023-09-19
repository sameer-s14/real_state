import { PropertyHelper } from './../helpers/property.helper';
import { handlerError } from './../utils/responseHandler';
import { IResponse, IUser } from './../interfaces';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PROPERTY_STATUS, SWAGGER_TAGS } from 'src/constants';
import {
  SavePropertyDto,
  SaveLocationDto,
  UpdatePropertyDto,
  SavePropertyDetailsDto,
  SavePropertyFeatureDto,
} from 'src/dto';
import { PropertyService } from 'src/services';
import { initResponse, setResponse, initSuccessResponse } from 'src/utils';
import { AuthGuard } from 'src/middlewares';
import { Request, Response } from 'express';
import { UserDetails } from 'src/decorators';

@Controller('/v1/properties')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly propertyHelper: PropertyHelper,
  ) {}
  /**
   * @description This route is the first step in for creating a property
   * @argument {stateId,cityId,listingTypeId = [rent,sale]}
   * @returns {propertyId}
   */
  @ApiOperation({
    tags: [SWAGGER_TAGS.PROPERTY],
    description: '1st route to save property basic details',
  })
  @Post('/basic-details')
  async savePropertyBasicDetails(
    @Body() body: SavePropertyDto,
    @UserDetails() user: IUser,
  ): Promise<IResponse> {
    const response = initResponse();
    const saveDetails = await this.propertyService.savePropertyDetails({
      addedBy: user?.id,
      listingTypeId: body?.listingTypeId,
      status: PROPERTY_STATUS.DRAFT,
    });
    await this.propertyService.savePropertyLocations({
      cityId: body?.cityId,
      stateId: body?.stateId,
      propertyId: saveDetails?.id,
    });
    return setResponse(response, { id: saveDetails?.id });
  }

  /**
   * @description Get saved property basic details
   */
  @ApiOperation({
    tags: [SWAGGER_TAGS.PROPERTY],
    description: 'Route to get property basic details',
  })
  @Get('/basic-details/:id')
  async getPropertyBasicDetails(
    @Param('id') id: string,
    @UserDetails() user: IUser,
  ): Promise<IResponse> {
    const response = initResponse();
    const propertyFound = await this.propertyService.getPropertyDetails(
      {
        id,
        addedBy: user?.id,
      },
      true,
      { raw: true, nest: true },
    );
    if (!propertyFound) {
      response.message = 'Property not found';
      return response;
    }
    return setResponse(response, propertyFound);
  }

  @ApiOperation({
    tags: [SWAGGER_TAGS.PROPERTY],
    description: 'Route to update property basic details',
  })
  @Patch('/basic-details/:id')
  async updateBasicDetails(
    @Body() body: UpdatePropertyDto,
    @Param('id') id: string,
    @UserDetails() user: IUser,
  ) {
    let response = initResponse();
    try {
      const { listingTypeId, cityId, stateId } = body;
      const propertyFound = await this.propertyService.getPropertyDetails(
        {
          id,
          addedBy: user?.id,
        },
        true,
      );
      if (!propertyFound) {
        response.message = 'Property not found';
        return response;
      }
      if (listingTypeId) {
        await propertyFound.update({
          listingTypeId,
        });
      }
      if (cityId) propertyFound?.propertyLocation?.set('cityId', cityId);
      if (stateId) propertyFound?.propertyLocation?.set('stateId', stateId);
      await propertyFound.propertyLocation.save();
      response = initSuccessResponse(null, 'SuccessFully updated');
    } catch (err) {
      handlerError(response, err, 'PropertyController :: updateBasicDetails');
    }
    return response;
  }
  /**
   * @description this route will save property location
   */
  @ApiOperation({
    tags: [SWAGGER_TAGS.PROPERTY],
    description: 'Save Property Locations if exits than update ',
  })
  @Post('/location/:id')
  async saveLocation(
    @UserDetails() user: IUser,
    @Body() body: SaveLocationDto,
    @Param('id') id: number,
  ) {
    const response = initResponse();
    const { address, exactLocation, lat, long } = body;
    try {
      response.status = true;
      const propertyFound = await this.propertyService.getPropertyDetails(
        {
          id: Number(id),
          addedBy: user?.id,
        },
        true,
      );
      if (!propertyFound) throw new Error('Property not Found');
      await propertyFound?.propertyLocation?.update({
        address,
        exactLocation,
        latitude: lat,
        longitude: long,
      });
      response.message = 'Saved Successfully!';
    } catch (error: unknown) {
      handlerError(response, error, 'PropertyController:saveLocation');
    }
    return response;
  }

  @ApiOperation({
    tags: [SWAGGER_TAGS.PROPERTY],
    description: 'Get Property Locations if exits',
  })
  @Get('/location/:id')
  async getLocation(
    @UserDetails() user: IUser,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    let response = initResponse();
    try {
      const propertyFound = await this.propertyService.getPropertyDetails(
        {
          id: Number(id),
          addedBy: user?.id,
        },
        true,
        {
          raw: true,
          nest: true,
        },
      );
      if (!propertyFound) throw new Error('Property not Found');
      response = initSuccessResponse(
        propertyFound?.propertyLocation,
        'Success',
      );
    } catch (error: unknown) {
      handlerError(response, error, 'PropertyController:saveLocation');
    }
    return res.json(response);
  }

  @ApiOperation({
    tags: [SWAGGER_TAGS.PROPERTY],
    description: 'Save Property Basic Details',
  })
  @Post('/property-details')
  async savePropertyDetails(
    @UserDetails() user: IUser,
    @Body() body: SavePropertyDetailsDto,
  ) {
    let response = initResponse();
    try {
      const { streetInfo, id, ...propertyDetails } = body;
      const propertyFound = await this.propertyService.getPropertyDetails(
        {
          id: Number(id),
          addedBy: user?.id,
        },
        false,
        {
          raw: true,
        },
      );
      if (!propertyFound) throw new Error('Property not Found');

      // saving streetInfos
      if (streetInfo?.length) {
        await this.propertyService.deleteStreetInfos({ propertyId: id });
        await this.propertyService.saveStreetInfosInBulk(
          this.propertyHelper.prepareStreetInfoData(streetInfo, id),
        );
      }

      // saving property details if found then we are updating it
      const propertyDetailsFound =
        await this.propertyService.getPropertyAttributesDetails({
          propertyId: id,
        });
      if (propertyDetailsFound) {
        await propertyDetailsFound.update(propertyDetails);
      } else {
        await this.propertyService.savePropertyAttributes(propertyDetails);
      }
      response = initSuccessResponse();
    } catch (err) {
      handlerError(response, err, 'PropertyController:savePropertyDetails');
    }
    return response;
  }

  @ApiOperation({
    tags: [SWAGGER_TAGS.PROPERTY],
    description: 'Save Property Features',
  })
  @Post('/feature-property')
  async saveFeatureDetails(
    @UserDetails() user: IUser,
    @Body() body: SavePropertyFeatureDto,
  ) {
    const responseObj = initSuccessResponse();
    const { id, ...propertyAttributesData } = body;
    try {
      if (!id) {
        throw new Error('Property id if required by id key');
      }
      const propertyFound = await this.propertyService.getPropertyDetails({
        id,
        addedBy: user?.id,
      });
      if (!propertyFound) {
        throw new Error('Property not Found');
      }
      const propertyAttributesFound =
        await this.propertyService.getPropertyAttributesDetails({
          propertyId: propertyFound?.id,
        });
      if (!propertyAttributesFound) {
        await this.propertyService.savePropertyAttributes({
          ...propertyAttributesData,
          propertyId: id,
        });
      } else {
        await propertyAttributesFound.update(propertyAttributesData);
      }
    } catch (err) {
      handlerError(responseObj, err, 'PropertyController::saveFeatureDetails');
    }
    return 'not implemented';
  }
}
