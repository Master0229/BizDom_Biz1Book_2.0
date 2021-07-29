import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { AuthService } from "src/app/auth.service";

@Injectable()
export class ErrorLogger implements ErrorHandler {
    constructor(private zone: NgZone, private auth: AuthService) { }

    handleError(error: Error) {

        // this.zone.run(() =>
        //     this.errorDialogService.openDialog(
        //         error.message || "Undefined client error"
        //     ));
        var error_data = {
            name: error.name,
            message: error.message,
            stack: error.stack
        }
        this.auth.logerror({ time: new Date(), error: error_data }).subscribe(data => {})
        console.error(error);
        // console.log("message", error.message);
        // console.log("name", error.name);
        // console.log("stack", error.stack);
    }
}
