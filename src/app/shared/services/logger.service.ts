import { Injectable } from "@angular/core";

@Injectable()
export class LoggerService {

  static enableLogging: boolean = false;

  log(data: any) {
    if (LoggerService.enableLogging)
      console.log(data);
  }

  error(err: any) {
    if (LoggerService.enableLogging)
      console.error(err);
  }


  warn(data: any) {
    if (LoggerService.enableLogging)
      console.warn(data);
  }

}
