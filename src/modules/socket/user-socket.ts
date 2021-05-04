export class UserSocket {
  databaseId: number;
  socketId: string;
  name: string;
  role: string;

  constructor(socketId: string) {
    this.socketId = socketId;
  }

  register(databaseId: number, name: string, role: string) {
    this.databaseId = databaseId;
    this.name = name;
    this.role = role;
  }
}
