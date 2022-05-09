import { Component, EventEmitter, Output } from '@angular/core';
import {LoggingServices} from "../shared/logging.services";
import {AccountsService} from "../shared/accounts.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingServices]
})
export class NewAccountComponent {

  constructor( private loggingService: LoggingServices,
                private accountService: AccountsService) {
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    this.loggingService.logStatusChange(accountStatus);
  }
}
