import { HttpStatus, Injectable } from "@nestjs/common";
import { OrderRepository } from "src/repositories/order.repository";

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository){}

    async createOrder(bookId: number, userId: number): Promise<any>{
        const orderData = {
            'bookId' : bookId,
            'userId' : userId,
            'status': 'approved'
        };
        const data = await this.orderRepository.save(orderData);
        return {'status': HttpStatus.CREATED, 'data':data};
    }

    async cancelOrder(bookId: number, userId: number): Promise<any>{
        const data = await this.orderRepository.update(userId, bookId);
        return {'status': HttpStatus.OK, 'data':data};
    }

    async listOrder(userId: number): Promise<any>{
        const data = await this.orderRepository.userOrder(userId);
        return {'status': HttpStatus.OK, 'data':data};
    }

    async listCanceledOrder(): Promise<any>{
        
    }
}