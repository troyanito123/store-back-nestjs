import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('AppGateway');

  @WebSocketServer() server: Server;

  handleDisconnect(client: Socket) {
    this.logger.log(`${client.id} is disconneted!`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`${client.id} is connected!`);
  }
}
