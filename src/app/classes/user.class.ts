interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  initials: string;
  color: string;
}

export class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  initials: string;
  color: string;

  constructor(data?: UserData) {
    this.username = data?.username || '';
    this.firstName = data?.firstName || '';
    this.lastName = data?.lastName || '';
    this.email = data?.email || '';
    this.password = data?.password || '';
    this.initials = data?.initials || '';
    this.color = data?.color || '';
  }

  toJson() {
    return {
      username: this.username,
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      password: this.password,
      initials: this.initials,
      color: this.color,
    };
  }
}
