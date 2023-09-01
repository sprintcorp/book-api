import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/authentication.middleware';
import { BookService } from 'src/services/book.service';

@Controller('/api/book')
export class BookController {
    constructor(private readonly bookService: BookService){}

    @Get('list')
    @UseGuards(JwtAuthGuard)
    async getBooks(@Res() res): Promise<any>{
        const books = await this.bookService.listBooks();
        return res.status(books.status).json(books.data); 
    }
}
