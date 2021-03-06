import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';
import { FindOneOrderDto } from './dto/find-one-order.dto';
import { DeliveredDto } from './dto/delivered.dto';
import { ChangeIsNewDto } from './dto/change-isNew.dto';
import { ChangeStatusDto } from './dto/change-status.dto';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.create(createOrderDto, req.user.id);
  }

  @Get()
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @Get('user')
  findAllByUser(@Request() req) {
    return this.orderService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param() params: FindOneOrderDto) {
    return this.orderService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Post('delivered')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  changeStatusDelivered(@Body() deliveredDto: DeliveredDto) {
    return this.orderService.changeDelivered(deliveredDto);
  }

  @Put('change/status')
  changeStatus(@Body() changeStatusDto: ChangeStatusDto) {
    return this.orderService.changeStatus(changeStatusDto);
  }
}
