interface SubtaskData {
  title: string;
  status: boolean;
}

export class Subtask {
  title: string;
  status: boolean;

  constructor(data?: SubtaskData) {
    this.title = data?.title || '';
    this.status = data?.status || false;
  }

  asJson() {
    return {
      title: this.title,
      status: this.status,
    };
  }
}
