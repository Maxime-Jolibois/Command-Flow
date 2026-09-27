import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQEvent } from './rabbitmq-event.enum.js';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('RABBITMQ_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  public publish<T>(pattern: RabbitMQEvent, data: T): void {
    this.client.emit(pattern, data);
  }
}
