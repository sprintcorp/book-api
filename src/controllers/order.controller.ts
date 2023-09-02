import { Body, Controller, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { OrderDto } from 'src/dto/order.dto';
import { JwtAuthGuard } from 'src/middlewares/authentication.middleware';
import { OrderService } from 'src/services/order.service';

@Controller('/api/order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createOrder(@Res() res, @Req() req, @Body() body: OrderDto ): Promise<any>{
        const order = await this.orderService.createOrder(body.bookId, req.user);
        return res.status(order.status).json(order.data); 
    }

    @Put('cancel/:id')
    @UseGuards(JwtAuthGuard)
    async cancelOrder(@Res() res, @Req() req, @Param('id') id){
        const order = await this.orderService.cancelOrder(id);
        return res.status(order.status).json(order.data); 
    }

    @Get('list')
    @UseGuards(JwtAuthGuard)
    async myOrders(@Res() res, @Req() req){
        const order = await this.orderService.listOrder(req.user.id);
        return res.status(order.status).json(order.data);
    }

    @Get('cancelled')
    @UseGuards(JwtAuthGuard)
    async myCancelledOrders(@Res() res, @Req() req){
        const order = await this.orderService.listCanceledOrder(req.user.id);
        return res.status(order.status).json(order.data);
    }
}
