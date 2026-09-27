import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { ProductsModule } from '../products/products.module.js';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module.js';
import { OrderCreateHandler } from './handlers/order-created.handler.js';
import { OrderCompletedHandler } from './handlers/order-completed.handle.js';
import { OrderFailedHandler } from './handlers/order-failed.handle copy.js';

@Module({
  imports: [ProductsModule, RabbitMQModule],
  controllers: [
    OrdersController,
    OrderCreateHandler,
    OrderCompletedHandler,
    OrderFailedHandler,
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
