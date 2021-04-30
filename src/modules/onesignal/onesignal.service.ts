import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OneSignalAppClient,
  NotificationBySegmentBuilder,
  NotificationByDeviceBuilder,
} from 'onesignal-api-client-core';
import { ConfigOptions } from 'src/config/config';
import { Order } from '../order/entities/order.entity';
import { UserService } from '../user/user.service';
import { NotificationUserDto } from './dto/notification-user.dto';

@Injectable()
export class OnesignalService {
  private client: OneSignalAppClient;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.client = new OneSignalAppClient(
      configService.get(ConfigOptions.onesignalAppId),
      configService.get(ConfigOptions.onesignalRestApiKey),
    );
  }

  async createOrderNotificationForAdmin(order: Order) {
    const enMessage = `Has a cost of Bs ${order.total} without shipping, click here to view the order.`;
    const esMessage = `Tiene un costo Bs ${order.total} sin envío, haga clic aquí para ver el pedido.`;
    const admins = await this.userService.findAdmin();
    const adminIds = admins
      .map((a) => a.push_id)
      .filter((a) => a !== null && a !== '' && a !== 'no-push-id');
    const input = new NotificationByDeviceBuilder()
      .setIncludePlayerIds(adminIds)
      .notification() // .email()
      .setHeadings({
        en: 'A new order has been created!',
        es: 'Se ha creado un nuevo pedido!',
      })
      .setContents({ en: enMessage, es: esMessage })
      .setSubtitle({ en: 'El licorcito feliz', es: 'El licorcito feliz' })
      .setAttachments({ data: { orderId: order.id } })
      .build();
    return this.client.createNotification(input);
  }

  async notificationUser(notificationUser: NotificationUserDto) {
    const user = await this.userService.findOne(notificationUser.userId);
    if (
      user.push_id !== null &&
      user.push_id !== 'no-push-id' &&
      user.push_id !== ''
    ) {
      const input = new NotificationByDeviceBuilder()
        .setIncludePlayerIds([user.push_id])
        .notification() // .email()
        .setHeadings({
          en: notificationUser.title,
          es: notificationUser.title,
        })
        .setContents({ en: notificationUser.body, es: notificationUser.body })
        .setSubtitle({ en: 'El licorcito feliz', es: 'El licorcito feliz' })
        .setAttachments({ data: { orderId: notificationUser.orderId } })
        .build();
      return this.client.createNotification(input);
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['No se puede mandar push notification a este usuario'],
          error: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
