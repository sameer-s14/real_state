import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        console.log(
          '🚀 ~CustomValidationPipe ~ constructor ~ errors:',
          Object.values(errors[0]?.constraints)[0],
        );
        return new BadRequestException({
          status: false,
          message: Object.values(errors[0]?.constraints)[0],
          data: null,
        });
      },
    });
  }
}
