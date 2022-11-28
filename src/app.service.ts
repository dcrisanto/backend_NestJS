import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('MONGO') private database: Db,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): string {
    console.log(this.tasks);
    return `Hello World! ${this.apiKey}`;
  }

  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
