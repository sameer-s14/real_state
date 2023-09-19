import { Logger } from '@nestjs/common';
import { IResponse } from 'src/interfaces';

export const initResponse = (data = null, message = 'Failed'): IResponse => ({
  status: false,
  data,
  message,
});

export const setResponse = (
  response: IResponse,
  data: unknown,
  message = 'Success',
): IResponse => {
  response.status = true;
  response.message = message;
  response.data = data;
  return response;
};

export const initSuccessResponse = (data = null, message = 'Success') => {
  return { status: true, data, message };
};

export const handlerError = (
  responseObj: IResponse,
  error: unknown,
  path = 'Catch Block Error',
) => {
  responseObj.status = true;
  responseObj.message = `${path} :: ${(error as Error).message}`;
  responseObj.data = null;
  Logger.log(responseObj.message);
  return responseObj;
};
