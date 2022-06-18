export class Logs {
  id?: number;
  description: string;
  created_at: Date;

  constructor(description: string, created_at: Date) {
    this.description = description;
    this.created_at = created_at;
  }
}
