import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { RabbitMQEvent } from '../../rabbitmq/rabbitmq-event.enum.js';
import type { OrderFailedEvent } from '../events/order-failed.event.js';

@Controller()
export class OrderFailedHandler {
  constructor() {}

  @EventPattern(RabbitMQEvent.ORDER_FAILED)
  public handlerOrderFailed(event: OrderFailedEvent) {
    console.log(`Order ${event.orderId} has failed`);
  }
}
