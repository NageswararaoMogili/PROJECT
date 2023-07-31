import { 
  Component, 
  EventEmitter,
  OnDestroy,
  OnInit,
  Output 
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  userObs: Subscription;


    constructor( private datastorageservice: DataStorageService, private authservice: AuthService){}

    ngOnInit(): void {
       this.userObs = this.authservice.user.subscribe( userData => {
        this.isAuthenticated = !!userData;
        })
    }

  onSaveData(){
    this.datastorageservice.storeData();
  }

  onFetchData(){
    this.datastorageservice.fetchData().subscribe();
  }
  onLogout(){
    this.authservice.logOut();
  }

  ngOnDestroy(): void {
      this.userObs.unsubscribe()
  }
}
