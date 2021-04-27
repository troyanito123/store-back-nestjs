import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';
import { UpdatePushIdDto } from './dto/update_push_id.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  findOne(@Param() params: FindOneUserDto) {
    return this.userService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  async update(
    @Param() params: FindOneUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(params.id, updateUserDto);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [
            `The field name: ${updateUserDto.email} already exists. Choose another!`,
          ],
          error: 'Bad request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  remove(@Param() params: FindOneUserDto) {
    return this.userService.remove(params.id);
  }

  @Post('push')
  updatePushId(@Request() req, @Body() updatePushId: UpdatePushIdDto) {
    return this.userService.updatePushId(updatePushId, req.user);
  }
}
