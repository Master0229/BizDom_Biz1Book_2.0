import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private electronService: ElectronService) { }
  print(html,printers) {
    if (this.electronService.isElectronApp)
      this.electronService.remote.getGlobal("print")(1, printers, html);
  }
}
