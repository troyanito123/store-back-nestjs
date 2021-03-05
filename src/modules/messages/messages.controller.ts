import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { FindOneOrderDto } from '../order/dto/find-one-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    return this.messagesService.create(createMessageDto, req.user.role);
  }

  @Get('order/:id')
  findAllByUser(@Request() req, @Param() params: FindOneOrderDto) {
    return this.messagesService.findAllByUser(req.user.id, params.id);
  }
}
