import dayjs from 'dayjs';

export interface ITaskInitData {
  title: string
  dueDate?: Date
}

export interface ITaskJson {
  id?: string
  title: string
  dueDate?: string | null
  doneDate?: string | null
  createdAt: string
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

  static fromJson(payload: ITaskJson): Task {
    return new this({
      id: payload.id,
      title: payload.title,
      dueDate: payload.dueDate ? dayjs(payload.dueDate).toDate() : null,
      doneDate: payload.doneDate ? dayjs(payload.doneDate).toDate() : null,
      createdAt: dayjs(payload.createdAt).toDate(),
    });
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

export const taskSerializer = {
  read: (v: any) => {
    const parsed: ITaskJson[] | null = JSON.parse(v);

    return parsed?.map(item => Task.fromJson(item)) ?? [];
  },
  write: (v: any) => JSON.stringify(v),
};
