interface CategoryData {
  name: string;
  color: string;
}

export class Category {
  name: string;
  color: string;

  constructor(data?: CategoryData) {
    this.name = data?.name || '';
    this.color = data?.color || '';
  }

  asJson() {
    return {
      title: this.name,
      status: this.color,
    };
  }
}
