import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { OrdersModule } from './orders/orders.module.js';
import { ProductsModule } from './products/products.module.js';
import { MessagingModule } from './messaging/messaging.module.js';

@Module({
  imports: [OrdersModule, ProductsModule, MessagingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
