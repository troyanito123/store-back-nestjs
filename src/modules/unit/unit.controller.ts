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
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { FindOneUnitDto } from './dto/find-one-unit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Roles(RoleOptions.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param() params: FindOneUnitDto) {
    return this.unitService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param() params: FindOneUnitDto,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    const unit = await this.unitService.update(params.id, updateUnitDto);
    if (!unit) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [
            `The field name: ${updateUnitDto.code} already exists. Choose another!`,
          ],
          error: 'Bad request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return unit;
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param() params: FindOneUnitDto) {
    return this.unitService.remove(params.id);
  }
}
