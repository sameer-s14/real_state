import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { initResponse } from 'src/utils';

@Catch()
export class ErrorHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Internal Server Error';
    const responseObj = initResponse(
      null,
      (exception as Error)?.message || message,
    );
    console.log(responseObj?.message);
    return response.status(status).json(responseObj);
  }
}
