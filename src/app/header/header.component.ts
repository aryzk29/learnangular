import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuth = false;
  private userSubs: Subscription;

  constructor(private dataStoreService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userSubs = this.authService.user.subscribe( user => {
      this.isAuth = !!user //!user ? false : true;
    })
  }

  onSaveData() {
    this.dataStoreService.storeRecipes();
  }

  onFetchData() {
    this.dataStoreService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
