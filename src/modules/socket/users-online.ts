import { UserSocket } from './user-socket';

export class UsersOnline {
  private static _instance: UsersOnline;
  private _list: UserSocket[] = [];

  private constructor() {}

  static get instance() {
    return this._instance || (this._instance = new this());
  }

  get list() {
    return [...this._list];
  }

  addToList(socketId: string) {
    this._list.push(new UserSocket(socketId));
  }

  registerUser(socketId: string, databaseId: number, name: string) {
    this._list = this._list.map((u) => {
      if (u.socketId === socketId) {
        u.register(databaseId, name);
      }
      return u;
    });
  }

  removeUser(socketId: string) {
    this._list = this.list.filter((u) => u.socketId !== socketId);
  }
}
