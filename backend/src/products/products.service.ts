import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PrismaProduct } from './products.types.js';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    createProductDto: CreateProductDto,
  ): Promise<PrismaProduct> {
    return this.prismaService.db.orm.public.Product.create({
      id: randomUUID(),
      ...createProductDto,
    });
  }

  public async findAll(): Promise<PrismaProduct[]> {
    return this.prismaService.db.orm.public.Product.all();
  }

  public async findOne(id: string): Promise<PrismaProduct | null> {
    return this.prismaService.db.orm.public.Product.first({ id: id });
  }

  public async findByIds(ids: string[]): Promise<PrismaProduct[]> {
    return this.prismaService.db.orm.public.Product.where((p) =>
      p.id.in(ids),
    ).all();
  }

  public update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<PrismaProduct | null> {
    return this.prismaService.db.orm.public.Product.where({ id: id }).update(
      updateProductDto,
    );
  }

  public async delete(id: string): Promise<PrismaProduct | null> {
    return this.prismaService.db.orm.public.Product.where({ id: id }).delete();
  }

  public async reserveStock(id: string, quantity: number): Promise<boolean> {
    const plan = this.prismaService.db.sql.public.Product.update((p, fns) => ({
      stock: fns.raw`${p.stock} - ${quantity}`.returns('pg/int4@1'),
    }))
      .where((p, fns) => fns.and(fns.eq(p.id, id), fns.gte(p.stock, quantity)))
      .build();

    const result = await this.prismaService.db.runtime().execute(plan);

    return result.affectedRows === 1;
  }
}
