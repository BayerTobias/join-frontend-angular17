interface UserData {
  username: string;
  email: string;
  password: string;
}

export class User {
  username: string;
  email: string;
  password: string;

  constructor(data?: UserData) {
    this.username = data?.username || '';
    this.email = data?.email || '';
    this.password = data?.password || '';
  }

  toJson() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }
}
