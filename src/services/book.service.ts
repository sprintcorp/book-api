import { HttpStatus, Injectable } from "@nestjs/common";
import { BookRepository } from "src/repositories/book.repository";

@Injectable()
export class BookService {
    constructor(private bookRepository: BookRepository){}

    async listBooks(): Promise<any>{
        try{
            const books = await this.bookRepository.getBooks();
           
            return {'status': HttpStatus.OK, 'data':books};
        }catch(e){
            throw e;
        }
    }

    async getHello(){
        console.log("hello world");
    }
}