interface UserData {
  username: string;
  id: number;
}

export class UserSummary {
  username: string;
  id: number;

  constructor(data?: UserData) {
    this.username = data?.username || '';
    this.id = data?.id || -1;
  }

  toJson() {
    return {
      username: this.username,
      id: this.id,
    };
  }
}
