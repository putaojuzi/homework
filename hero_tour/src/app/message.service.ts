import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  constructor() { }

  add(message: string): void{
    this.messages.unshift(message);// 头插法，使最新操作显示在最上面
  }

  clear(): void{
    this.messages = [];
  }
}
