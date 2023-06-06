import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async createOrder(user, orders) {
    const order = await this.prisma.order.create({
      data: {
        userId: String(user.id),
        price: 12,
      },
    });

    const orderItems = orders[0].cart.map(async (element) => {
      await this.prisma.orderItem.create({
        data: {
          orderId: order.id,
          name: element.name,
          price: +element.price,
          quantity: element.quantity,
        },
      });
    });

    await Promise.all(orderItems);
  }

  async findUser(username, id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createUser(id: string, username: string) {
    try {
      const user = await this.findUser(username, id);
      if (!user) {
        const newUser = await this.prisma.user.create({
          data: {
            id: id,
            username: username,
            balance: 0,
          },
        });
        return newUser;
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
}