import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsModule } from './Products/Products.module';
import { AuthModule } from './Auth/Auth.module';
import { UserModule } from './Users/Users.module';
import { UserDataMiddleware } from './Users/user.middleware';
import { AuthMiddleware } from './Auth/auth.middleware';
import { ProductDataMiddleware } from './Products/Product.middleware';


@Module({
  imports: [ProductsModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserDataMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.PUT}
      )
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: "auth/singn", method: RequestMethod.POST})
    consumer
      .apply(ProductDataMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PUT}
      )
  }
}
