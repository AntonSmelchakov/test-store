import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module.js';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module.js';
import { OrderItemsModule } from './order-items/order-items.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../.env"
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
              type: 'mysql',
              host: config.get('DB_HOST'),
              port: config.get('DB_PORT'),
              username: config.get('DB_USER'),
              password: config.get('DB_PASSWORD'),
              database: config.get('DB_NAME'),
              autoLoadEntities: true,
              synchronize: false,
            }),
    }),
    ProductsModule,
    OrdersModule,
    OrderItemsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
