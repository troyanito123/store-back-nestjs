import { Injectable, Inject } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider';
import * as fs from 'fs-extra';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'src/config/config';
import { ImageInterface } from 'src/utils/image.interface';
@Injectable()
export class CloudinaryService {
  private v2: any;
  constructor(
    @Inject(Cloudinary) private cloudinary,
    private configService: ConfigService,
  ) {
    this.cloudinary.v2.config({
      cloud_name: configService.get(ConfigOptions.cloudinary_name),
      api_key: configService.get(ConfigOptions.cloudinary_api_key),
      api_secret: configService.get(ConfigOptions.cloudinary_api_secret),
    });
    this.v2 = cloudinary.v2;
  }
  async uploadImages(images: any[]): Promise<string[]> {
    let urls = [];
    for (let image of images) {
      const result = await this.v2.uploader.upload(image.path);
      urls.push(result.secure_url);
      await fs.unlink(image.path);
    }
    return urls;
  }

  async uploadImage(image: ImageInterface): Promise<string> {
    const uploadedImage = await this.v2.uploader.upload(image.path);
    await fs.unlink(image.path);
    return uploadedImage.secure_url;
  }

  async replaceImage(imageId: string, newImage: ImageInterface) {
    const deleted = await this.v2.uploader.destroy(imageId);
    if (deleted.result !== 'ok') {
      return null;
    }
    const uploadedImage = await this.v2.uploader.upload(newImage.path);
    await fs.unlink(newImage.path);
    return uploadedImage.secure_url;
  }

  async deleteImage(imageId: string) {
    const deleted = await this.v2.uploader.destroy(imageId);
    return deleted.result === 'ok' ? true : false;
  }
}
