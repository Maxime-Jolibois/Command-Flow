import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ProductsService {
  // Currently create in memory
  private products: Product[] = [];

  constructor() {
    this.seed();
  }

  create(createProductDto: CreateProductDto) {
    this.products.push({
      ...createProductDto,
      id: randomUUID(),
      createAt: new Date(),
    });
  }

  public findAll() {
    return this.products;
  }

  public findOne(id: string): Product {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  public findByIds(ids: string[]): Product[] {
    return this.products.filter((p) => ids.includes(p.id));
  }

  public update(id: string, updateProductDto: UpdateProductDto): Product {
    const index: number = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    this.products[index] = {
      ...this.products[index],
      ...updateProductDto,
    };

    return this.products[index];
  }

  public remove(id: string) {
    const index: number = this.products.findIndex((p) => p.id === id);

    if (index != -1) {
      this.products.splice(index, 1);
    }
  }

  public checkStock(id: string, quantity: number): boolean {
    //TODO: Changing with PostgresSQL => lock quantity for concurrency
    const product = this.findOne(id);
    console.log(product.id, product.stock, quantity);
    return product.stock >= quantity;
  }

  private seed(): void {
    this.create({
      name: 'Clavier mécanique',
      description: 'Clavier mécanique RGB',
      price: 89.99,
      stock: 10,
    });

    this.create({
      name: 'Souris sans fil',
      description: 'Souris ergonomique sans fil',
      price: 49.99,
      stock: 25,
    });

    this.create({
      name: 'Écran 27 pouces',
      description: 'Écran 27 pouces 144 Hz',
      price: 249.99,
      stock: 5,
    });
  }
}
