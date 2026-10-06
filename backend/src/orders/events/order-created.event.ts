export interface OrderCreatedEvent {
  orderId: string;
  customerEmail: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
  total: number;
}
