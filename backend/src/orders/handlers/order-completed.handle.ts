import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { RabbitMQEvent } from '../../rabbitmq/rabbitmq-event.enum.js';
import type { OrderCompletedEvent } from '../events/order-completed.event.js';

@Controller()
export class OrderCompletedHandler {
  constructor() {}

  @EventPattern(RabbitMQEvent.ORDER_COMPLETED)
  public handlerOrderComplete(event: OrderCompletedEvent) {
    console.log(`Order ${event.orderId} has been completed`);
  }
}
