import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/services';
import { initSuccessResponse } from 'src/utils';
import { ApiOperation } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/constants';
import { SignUpDto } from 'src/dto';

@Controller('/v1')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({
    tags: [SWAGGER_TAGS.AUTH],
    description: 'Route to get token',
  })
  @Post('/get-token')
  async getToken(@Body() body: SignUpDto) {
    const { email, password, name = 'dummy name' } = body;
    let usersData = await this.authService.getUserDetails({
      email,
    });
    if (!usersData) {
      usersData = await this.authService.saveUser({
        email,
        name,
        password,
      });
    }
    const token = await this.jwtService.signAsync({ id: usersData?.id });
    return initSuccessResponse({ token });
  }
}
