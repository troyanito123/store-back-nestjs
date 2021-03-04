import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config } from './config/config';
import { DatabaseConfig } from './config/database.config';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { UnitModule } from './modules/unit/unit.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesModule } from './modules/images/images.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    MulterModule.register({
      dest: './files',
    }),
    RoleModule,
    UserModule,
    AuthModule,
    ProductModule,
    UnitModule,
    CloudinaryModule,
    ImagesModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
