import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private orders = [];

  findAllOrders(): any[] {
    return this.orders;
  }
  findOrderById(id: number): any {
    return this.orders.find((order) => order.id === id);
  }
  findOrderByUserId(userId: number): any[] {
    return this.orders.filter((order) => order.userId === userId);
  }
  createOrder(createOrderDto: any): any {
    const newOrder = { id: this.orders.length + 1, ...createOrderDto };
    this.orders.push(newOrder);
    return newOrder;
  }
  updateOrder(id: number, updateOrderDto: any): any {
    const order = this.orders.find((order) => order.id === id);
    Object.assign(order, updateOrderDto);
    this.orders = this.orders.map((order) => (order.id === id ? order : order));
    return order;
  }
}
