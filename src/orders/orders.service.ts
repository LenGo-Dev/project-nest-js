import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderModel } from '../generated/prisma/models/Order';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<OrderModel[]> {
    return this.prismaService.order.findMany({
      include: { product: true, client: true },
    });
  }

  public getById(id: OrderModel['id']): Promise<OrderModel | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
  }

  public deleteById(id: OrderModel['id']): Promise<OrderModel> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(
    orderData: Omit<OrderModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderModel> {
    const { productId, clientId, ...otherData } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          ...otherData,
          product: productId ? { connect: { id: productId } } : undefined,
          client: clientId ? { connect: { id: clientId } } : undefined,
        },
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
      throw error;
    }
  }

  public updateById(
    id: OrderModel['id'],
    orderData: Omit<OrderModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderModel> {
    const { productId, clientId, ...otherData } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        ...otherData,
        product: productId
          ? { connect: { id: productId } }
          : { disconnect: true },
        client: clientId ? { connect: { id: clientId } } : { disconnect: true },
      },
    });
  }
}
