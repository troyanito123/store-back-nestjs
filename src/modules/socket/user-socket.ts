export class UserSocket {
  databaseId: number;
  socketId: string;
  name: string;

  constructor(socketId: string, databaseId?: number, name?: string) {
    this.socketId = socketId;
    this.databaseId = databaseId || null;
    this.name = name || null;
  }

  register(databaseId: number, name: string) {
    this.databaseId = databaseId;
    this.name = name;
  }
}
