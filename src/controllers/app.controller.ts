import { Controller, Get, Res } from '@nestjs/common';
import { BookService } from 'src/services/book.service';
import {
    MessagePattern,
    RmqContext,
    Ctx,
    Payload
  } from '@nestjs/microservices';
import { RabbitMQService } from 'src/services/rabbitmq.service';

@Controller('/api/app')
export class AppController {
    constructor(private readonly rabbitMQService: RabbitMQService, private readonly bookService: BookService){}

    
    @Get('test')
    async getHello() {
        this.rabbitMQService.send('hello_world', {
        message: this.bookService.getHello(),
        });
        return 'Message sent to the queue!';
    }



    @MessagePattern('hello_world')
    async execute(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage;
        console.log('data', data);
        channel.ack(orginalMessage);
    }
}
