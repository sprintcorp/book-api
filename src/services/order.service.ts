import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BookRepository } from "src/repositories/book.repository";
import { OrderRepository } from "src/repositories/order.repository";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository, 
        private bookRepository: BookRepository, private userRepository: UserRepository){}

    async createOrder(bookId: number, user: any): Promise<any>{
        const orderData = {
            'bookId' : bookId,
            'userId' : user.id,
            'status': 'approved'
        };
        const book = await this.bookRepository.getBook(bookId);

        if(user.point < book.point){
            throw new HttpException('You do not have sufficient point to make this order', HttpStatus.FORBIDDEN)
        }

        const newUserPoint = user.point - book.point;
        const data = await this.orderRepository.save(orderData);

        if(data){
            await this.userRepository.updateUser(user.id, newUserPoint);
        }
        
        return {'status': HttpStatus.CREATED, 'data':data};
    }

    async cancelOrder(bookId: number, user: any): Promise<any>{

        const book = await this.bookRepository.getBook(bookId);
        
        const newUserPoint = user.point + book.point;

        const data = await this.orderRepository.update(bookId, user.id);
        if(data){
            await this.userRepository.updateUser(user.id, newUserPoint);
        }
        return {'status': HttpStatus.OK, 'data':data};
    }

    async listOrder(userId: number): Promise<any>{
        const data = await this.orderRepository.userOrder(userId);
        return {'status': HttpStatus.OK, 'data':data};
    }

    async listCanceledOrder(userId: number): Promise<any>{
        const data = await this.orderRepository.cancelledUserOrder(userId);
        return {'status': HttpStatus.OK, 'data':data};
    }
}