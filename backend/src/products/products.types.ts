import { db } from '../prisma/db';

export type PrismaProduct = Awaited<
  ReturnType<typeof db.orm.public.Product.all>
>[number];
