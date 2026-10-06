import { EventPattern } from '@nestjs/microservices';
import { RabbitMQEvent } from '../../rabbitmq/rabbitmq-event.enum.js';
import { Controller } from '@nestjs/common';
import type { OrderCreatedEvent } from '../events/order-created.event.js';
import { ProductsService } from '../../products/products.service.js';
import { RabbitMQService } from '../../rabbitmq/rabbitmq.service.js';
import { OrdersService } from '../orders.service.js';

@Controller()
export class OrderCreateHandler {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @EventPattern(RabbitMQEvent.ORDER_CREATED)
  public async handlerOrderCreated(event: OrderCreatedEvent) {
    console.log('Order created event: ', event);

    for (const item of event.items) {
      const isReserved = await this.productsService.reserveStock(
        item.productId,
        item.quantity,
      );

      if (isReserved === false) {
        await this.ordersService.fail(event.orderId);

        this.rabbitMQService.publish(RabbitMQEvent.ORDER_FAILED, {
          orderId: event.orderId,
        });
        return;
      }
    }

    // Success
    await this.ordersService.complete(event.orderId);

    this.rabbitMQService.publish(RabbitMQEvent.ORDER_COMPLETED, {
      orderId: event.orderId,
    });
  }
}
