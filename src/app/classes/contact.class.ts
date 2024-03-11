interface ContactData {
  name: string;
  email: string;
  phone: number;
}

export class Contact {
  name: string;
  email: string;
  phone: number;

  constructor(data?: ContactData) {
    this.name = data?.name || '';
    this.email = data?.email || '';
    this.phone = data?.phone || -1;
  }

  asJson() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
    };
  }
}
