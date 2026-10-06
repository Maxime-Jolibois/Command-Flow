import { db } from '../prisma/db';

export type PrismaOrder = Awaited<
  ReturnType<typeof db.orm.public.Order.all>
>[number];

export type PrismaOrderItem = Awaited<
  ReturnType<typeof db.orm.public.OrderItem.all>
>[number];
