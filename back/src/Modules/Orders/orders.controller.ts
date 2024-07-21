import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './Dtos/CreateOrder.dto';
import { Order } from './Entities/Order.entity';
import { AuthGuard } from '../Auth/Guards/Auth.guard';
import { ErrorManager } from '../../Utils/ErrorManager';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Orders")
@Controller('orders') 
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) {}

    @Get()
    async getOrders (): Promise<Order[]> {
        return ErrorManager ({
            functionTry:() => this.ordersService.getOrders(),
            message: "Error al intentar mostrar las ordenes"
        }) 
    }
    
    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    async getOrderById (@Param("id", ParseUUIDPipe) id:string): Promise<Order> {

        return ErrorManager ({
            functionTry:() => this.ordersService.getOrderById(id), 
            message: "Error al intentar mostrar la orden"
        }) 
    }
    
    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    async addOrder (@Body() order: CreateOrderDto): Promise<Order | string> {
        
        return ErrorManager ({
            functionTry: () => this.ordersService.addOrder(order),
             message:"Error al intentar crear la orden"
            }) 
    } 
}
