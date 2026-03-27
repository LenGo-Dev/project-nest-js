import { Injectable } from '@nestjs/common';
import { ProductModel } from '../generated/prisma/models/Product';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<ProductModel[]> {
    return this.prismaService.product.findMany();
  }

  public getById(id: ProductModel['id']): Promise<ProductModel | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  public deleteById(id: ProductModel['id']): Promise<ProductModel> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }

  public create(
    productData: Omit<ProductModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductModel> {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  public updateById(
    id: ProductModel['id'],
    productData: Omit<ProductModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductModel> {
    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  }

  public getAllExtended(): Promise<ProductModel[]> {
    return this.prismaService.product.findMany({
      include: { orders: true },
    });
  }

  public getExtendedById(id: ProductModel['id']): Promise<ProductModel | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { orders: true },
    });
  }
}
