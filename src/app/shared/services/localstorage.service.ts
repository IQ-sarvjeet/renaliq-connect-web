import { Injectable, } from '@angular/core';


@Injectable()
export class LocalStorageService {

  constructor() { }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  clearAll() {
    localStorage.clear();
  }
  removeItem(key: string): any {
    localStorage.removeItem(key);
  }

}
