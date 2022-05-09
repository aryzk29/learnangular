import { Component, EventEmitter, Input, Output } from '@angular/core';
import {LoggingServices} from "../shared/logging.services";
import {AccountsService} from "../shared/accounts.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingServices]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor( private loggingService: LoggingServices,
               private accountService: AccountsService) {
  }

  onSetTo(status: string) {
    this.accountService.updateAccount(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}
