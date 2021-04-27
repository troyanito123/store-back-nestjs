import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersOnline } from './users-online';

@WebSocketGateway()
export class OrderGateway {
  private logger = new Logger('AppGateway');

  @WebSocketServer() server: Server;

  userOnline: UsersOnline;

  constructor() {
    this.userOnline = UsersOnline.instance;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`${client.id} is disconneted!`);
    this.userOnline.removeUser(client.id);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`${client.id} is connected!`);
    this.userOnline.addToList(client.id);
  }
  @SubscribeMessage('login')
  handleMessage(client: Socket, payload: { id: number; name: string }): void {
    this.userOnline.registerUser(client.id, payload.id, payload.name);
    client.emit('resp-login', {
      ok: true,
      message: `Your socket id is: ${client.id}`,
    });
  }
}
