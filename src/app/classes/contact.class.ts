interface ContactData {
  name: string;
  email: string;
  phone: number;
  initials: string;
  color: string;
}

export class Contact {
  name: string;
  email: string;
  phone: number;
  initials: string;
  color: string;

  constructor(data?: ContactData) {
    this.name = data?.name || '';
    this.email = data?.email || '';
    this.phone = data?.phone || -1;
    this.initials = data?.initials || '';
    this.color = data?.color || '';
  }

  asJson() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      initials: this.initials,
      color: this.color,
    };
  }
}
