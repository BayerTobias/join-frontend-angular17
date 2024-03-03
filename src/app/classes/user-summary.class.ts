interface UserData {
  username: string;
  id: number;
  initials: string;
  color: string;
}

export class UserSummary {
  username: string;
  id: number;
  checked: boolean;
  initials: string;
  color: string;

  constructor(data?: UserData) {
    this.username = data?.username || '';
    this.id = data?.id || -1;
    this.checked = false;
    this.initials = data?.initials || '';
    this.color = data?.color || '';
  }

  toJson() {
    return {
      username: this.username,
      id: this.id,
    };
  }
}
