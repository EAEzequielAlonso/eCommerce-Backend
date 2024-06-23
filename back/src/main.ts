import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './Middlewares/logger.middleware';
import { ProductsRepository } from './Modules/Products/Products.respository';
import { CategoryRepository } from './Modules/Categories/Category.repository';
import { BadRequestException, ValidationPipe } from '@nestjs/common';


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

  await app.listen(3001);
}
bootstrap();
