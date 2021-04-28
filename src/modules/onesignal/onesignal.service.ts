import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OneSignalAppClient,
  NotificationBySegmentBuilder,
  NotificationByDeviceBuilder,
} from 'onesignal-api-client-core';
import { ConfigOptions } from 'src/config/config';
import { Order } from '../order/entities/order.entity';
import { UserService } from '../user/user.service';

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
      .filter((a) => a !== null && a !== '');
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
}
