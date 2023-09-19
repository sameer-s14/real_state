import { SWAGGER_TAGS } from 'src/constants';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe, ErrorHandler } from './helpers';
import { AppModule } from './modules';
import { ENV_KEY, SWAGGER_DOCS } from './constants';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  // getting config service set in app module
  const configService = app.get(ConfigService);
  app.enableCors();
  //setting custom Validation to handle response error
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new ErrorHandler());
  // Custom error handler

  //Configuring swagger docs
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_DOCS.TITLE)
    .setDescription(SWAGGER_DOCS.DESCRIPTION)
    .setVersion(SWAGGER_DOCS.VERSION)
    .addTag(SWAGGER_TAGS.MISC, 'This tag contains all the helper apis')
    .addTag(
      SWAGGER_TAGS.PROPERTY,
      'This tag contains all property creation route',
    )
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  // swagger module automatically creates docs for all api endpoints
  // to add details about property fields define @ApiProperty decorator in dto
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    // this is optional object
    customSiteTitle: SWAGGER_DOCS.WEBSITE_TITLE,
  });

  //listening to app
  app.listen(configService.get(ENV_KEY.PORT));
}

startServer();
