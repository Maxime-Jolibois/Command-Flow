export interface OrderCreatedEvent {
  orderId: string;
  customerEmail: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
  total: number;
}
