import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('PG') private clientPG: Client,
  ) {}
  getHello(): string {
    console.log(this.tasks);
    return `Hello World! ${this.apiKey}`;
  }

  getTasks() {
    //retornando una Promesa nativa
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
    /* const consult = this.clientPG.query('SELECT * FROM tasks', (err, res) => {
      if (err) throw err;
      console.log(err);
      console.log(res.rows);
    });
    return consult; */
  }
}
