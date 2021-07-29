import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  @Output() notification: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public emitNotif(data) {
    this.notification.emit(data)
  }

  public notify() {
    return this.notification
  }
}
