export interface ITaskInitData {
  title: string
  dueDate?: Date
}

export interface ITask {
  id?: string
  title: string
  dueDate?: Date | null
  doneDate?: Date | null
  createdAt: Date
}

export class Task implements ITask {
  id?: string;
  title: string;
  dueDate?: Date | null;
  doneDate?: Date | null;
  createdAt: Date;

  private constructor(payload: ITask) {
    this.id = payload.id;
    this.title = payload.title;
    this.dueDate = payload.dueDate;
    this.doneDate = payload.doneDate;
    this.createdAt = payload.createdAt;
  }

  static create(payload: ITaskInitData): Task {
    return new this({
      id: window.crypto.randomUUID(),
      title: payload.title,
      dueDate: payload.dueDate ?? null,
      doneDate: null,
      createdAt: new Date(),
    });
  }

  get isDone(): boolean {
    return !!this.doneDate;
  }
}
