import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './Middlewares/logger.middleware';
import { ProductsRepository } from './Modules/Products/Products.respository';
import { CategoryRepository } from './Modules/Categories/Category.repository';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map (error => {
        return {property: error.property, constraints: error.constraints}
      })
      return new BadRequestException ({
        alert: "Estos son los errores encontrados",
        errors: cleanErrors
      })
    }
  }))

  app.use(loggerGlobal);

  await app.get(CategoryRepository).preloadCategoriesSeed()

  await app.get(ProductsRepository).preloadProductsSeed()

  //genero el Document Builder donde preconfiguro los datos basicos 
  const swaggerConfig = new DocumentBuilder()
        .setTitle("Backend eCommerce")
        .setDescription("Esta es una API constuida para desarrollar un eCommerce de manera sencilla")
        .addBearerAuth()
        .setVersion("1.0")
        .build()
      
  //creo el documento. le asigno la ruta "api" 
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("API", app, document)

  await app.listen(3001);
}
bootstrap();
