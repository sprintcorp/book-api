import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Book } from 'src/entities/book.entity';
import { JwtAuthGuard } from 'src/middlewares/authentication.middleware';
import { BookService } from 'src/services/book.service';
import { LoggingService } from 'src/services/logger.service';

@Controller('/api/book')
export class BookController {
    constructor(private readonly bookService: BookService, private readonly loggingService: LoggingService){}

    @Get('list')
    @UseGuards(JwtAuthGuard)
    async getBooks(@Res() res): Promise<Book>{
        const books = await this.bookService.listBooks();
        return res.status(books.status).json(books.data); 
    }
}
