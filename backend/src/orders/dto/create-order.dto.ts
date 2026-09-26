import { CreateOrderItemDto } from './create-order-item.dto.js';

export class CreateOrderDto {
  customerName: string;
  customerEmail: string;
  items: CreateOrderItemDto[];
}
