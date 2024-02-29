interface CategoryData {
  name: string;
  color: string;
  id: number;
}

export class Category {
  name: string;
  color: string;
  id: number;

  constructor(data?: CategoryData) {
    this.name = data?.name || '';
    this.color = data?.color || '';
    this.id = data?.id || -1;
  }

  asJson() {
    return {
      name: this.name,
      color: this.color,
    };
  }
}
