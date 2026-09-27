import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service.js';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // Create client to communicate with rabbitMQ
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'command_flow_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
