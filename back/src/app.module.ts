import { Module } from '@nestjs/common';
import { ProductsModule } from './Products/Products.module';
import { AuthModule } from './Auth/Auth.module';
import { UserModule } from './Users/Users.module';


@Module({
  imports: [ProductsModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
