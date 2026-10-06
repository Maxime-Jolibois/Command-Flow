import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from './entities/order.entity.js';
import { ProductsService } from '../products/products.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { randomUUID } from 'node:crypto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service.js';
import { OrderCreatedEvent } from './events/order-created.event.js';
import { RabbitMQEvent } from '../rabbitmq/rabbitmq-event.enum.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PrismaOrder, PrismaOrderItem } from './orders.types.js';
import { PrismaProduct } from '../products/products.types.js';

@Injectable()
export class OrdersService {
  constructor(
    private readonly productService: ProductsService,
    private readonly prismaService: PrismaService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  public async create(dto: CreateOrderDto): Promise<PrismaOrder | null> {
    // Get product from order items
    const products: PrismaProduct[] = await this.productService.findByIds(
      dto.items.map((item) => item.productId),
    );

    // Create Map for efficiency
    const productsById = new Map(
      products.map((product) => [product.id, product]),
    );

    const orderItems: Omit<PrismaOrderItem, 'createdAt'>[] = [];
    const orderId = randomUUID();

    for (const item of dto.items) {
      const product = productsById.get(item.productId);

      // Validation
      if (product === undefined) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      // push to orderItem
      orderItems.push({
        id: randomUUID(),
        productId: product.id,
        orderId: orderId,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
      });
    }

    const order: Omit<PrismaOrder, 'createdAt'> = {
      id: orderId,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      status: OrderStatus.PENDING,
      totalPrice: orderItems.reduce(
        (total, i) => total + i.unitPrice * i.quantity,
        0,
      ),
    };

    // Create rabbitMQ event
    const event: OrderCreatedEvent = {
      orderId: order.id,
      customerEmail: dto.customerEmail,
      items: orderItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      total: order.totalPrice,
    };

    this.rabbitMQService.publish(RabbitMQEvent.ORDER_CREATED, event);

    return order;
  }

  public async findAll(): Promise<PrismaOrder[]> {
    return this.prismaService.db.orm.public.Order.all();
  }

  public async findOne(id: string): Promise<PrismaOrder | null> {
    return this.prismaService.db.orm.public.Order.first({ id });
  }

  public async updateStatus(
    id: string,
    status: OrderStatus,
  ): Promise<PrismaOrder | null> {
    return this.prismaService.db.orm.public.Order.where({ id }).update({
      status: status,
    });
  }

  public async complete(orderId: string): Promise<PrismaOrder | null> {
    return this.updateStatus(orderId, OrderStatus.COMPLETED);
  }

  public async fail(orderId: string): Promise<PrismaOrder | null> {
    return this.updateStatus(orderId, OrderStatus.FAILED);
  }
}
