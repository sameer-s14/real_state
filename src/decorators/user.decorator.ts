import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDetails = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request?.user;
    return user;
  },
);
