import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OneSignalAppClient,
  NotificationBySegmentBuilder,
} from 'onesignal-api-client-core';
import { ConfigOptions } from 'src/config/config';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OnesignalService {
  private client: OneSignalAppClient;

  constructor(private configService: ConfigService) {
    this.client = new OneSignalAppClient(
      configService.get(ConfigOptions.onesignalAppId),
      configService.get(ConfigOptions.onesignalRestApiKey),
    );
  }

  createOrderNotificationForAdmin(order: Order) {
    const enMessage = `A new order has been created. At a cost of Bs ${order.total} without shipping, click here to view the order.`;
    const esMessage = `Se ha creado un nuevo pedido. Con un costo Bs ${order.total} sin envío, haga clic aquí para ver el pedido.`;
    const input = new NotificationBySegmentBuilder()
      .setIncludedSegments(['Active Users', 'Inactive Users'])
      .notification() // .email()
      .setContents({ en: enMessage, es: esMessage })
      .setSubtitle({ en: 'El licorcito feliz', es: 'El licorcito feliz' })
      .setAttachments({ data: { orderId: order.id } })
      .build();
    return this.client.createNotification(input);
  }
}
