import { IDbDate } from './common.interface';

export interface IProperties extends IDbDate {
  id?: number;
  addedBy?: number;
  userTypeId?: number;
  status?: string;
  currentStep?: string;
  listingTypeId?: number;
  isActive?: boolean;
}

export interface IPropertyLocations extends IDbDate {
  stateId?: number;
  cityId?: number;
  address?: string;
  latitude?: string;
  longitude?: string;
  exactLocation?: boolean;
  landmark?: string;
  propertyId?: number;
}

export interface IStreetInfo {
  id?: number;
  propertyId?: number;
  streetWidth?: number;
  position?: number;
  facingTypeId?: number;
}
