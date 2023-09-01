import { Injectable } from "@nestjs/common";
import { OrderRepository } from "src/repositories/order.repository";

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository){}

    async createOrder(bookId: number): Promise<any>{

    }

    async cancelOrder(bookId: number): Promise<any>{

    }

    async listOrder(): Promise<any>{

    }

    async listCanceledOrder(): Promise<any>{
        
    }
}