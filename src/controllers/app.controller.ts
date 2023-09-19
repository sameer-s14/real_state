import { initResponse, setResponse } from '../utils/responseHandler';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  checkHealth() {
    return setResponse(initResponse(), null, 'Apis running fine');
  }
}
