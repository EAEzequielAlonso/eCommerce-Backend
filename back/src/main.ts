import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './Middlewares/logger.middleware';
import { ProductsRepository } from './Modules/Products/Products.respository';
import { CategoryRepository } from './Modules/Categories/Category.repository';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);

  await app.get(CategoryRepository).preloadCategoriesSeed()

  await app.get(ProductsRepository).preloadProductsSeed()

  await app.listen(3001);
}
bootstrap();
