import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order, OrderStatus } from './entities/order.entity.js';
import { ProductsService } from '../products/products.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderItem } from './entities/order-items.entity.js';
import { randomUUID } from 'node:crypto';
import { Product } from '../products/entities/product.entity.js';

@Injectable()
export class OrdersService {
  constructor(private readonly productService: ProductsService) {}

  // Currently store in memory
  private orders: Order[] = [];

  public create(dto: CreateOrderDto): Order {
    // Get product from order items
    const products: Product[] = this.productService.findByIds(
      dto.items.map((i) => i.productId),
    );

    // Create Map for efficiency
    const productsById = new Map(
      products.map((product) => [product.id, product]),
    );

    const orderItems: OrderItem[] = [];

    for (const item of dto.items) {
      const product = productsById.get(item.productId);

      // Validation
      if (product === undefined) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      //TODO: Define where to reduce the stock
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for product ${product.name}`,
        );
      }

      // push to orderItem
      orderItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
      });
    }

    // Create Order
    const order: Order = {
      id: randomUUID(),
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      status: OrderStatus.PENDING,
      items: orderItems,
      total: orderItems.reduce(
        (total, i) => total + i.unitPrice * i.quantity,
        0,
      ),
      createdAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }

  public findAll(): Order[] {
    return this.orders;
  }

  public findOne(id: string): Order | undefined {
    const order = this.orders.find((order) => order.id === id);

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }
}
