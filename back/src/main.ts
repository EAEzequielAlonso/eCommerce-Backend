import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './Middlewares/logger.middleware';
import { CategoryService } from './Modules/Categories/Category.service';
import { ProductsService } from './Modules/Products/Products.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);

  await app.get(CategoryService).preloadCategoriesSeed()

  await app.get(ProductsService).preloadProductsSeed()

  await app.listen(3001);
}
bootstrap();
