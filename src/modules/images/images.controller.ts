import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { ImageInterface } from '../../utils/image.interface';
import { FindOneImageDto } from './dto/find-one-image.dto';
import { join } from 'path';

@Controller('images')
@UseGuards(JwtAuthGuard)
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: join(__dirname, '../../public/img/uploads'),
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile() file: ImageInterface,
  ) {
    return this.imagesService.create(createImageDto, file);
  }

  @Put(':id')
  update(
    @Param() params: FindOneImageDto,
    @UploadedFile() file: ImageInterface,
  ) {
    return this.imagesService.update(params.id, file);
  }

  @Delete(':id')
  remove(@Param() params: FindOneImageDto) {
    return this.imagesService.remove(params.id);
  }
}
