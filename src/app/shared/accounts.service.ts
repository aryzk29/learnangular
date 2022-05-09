import {Injectable} from "@angular/core";
import {LoggingServices} from "./logging.services";

@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private loggingservice: LoggingServices) {
  }
  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.loggingservice.logStatusChange(status);
  }

  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingservice.logStatusChange(status);
  }
}
