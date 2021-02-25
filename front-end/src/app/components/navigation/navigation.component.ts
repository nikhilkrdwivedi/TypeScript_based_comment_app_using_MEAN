import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private _sharedService : SharedService) { }

  ngOnInit(): void {
    let sessionObj = JSON.parse((sessionStorage.getItem('userMetaData')));
    console.log(sessionObj )
    if(sessionObj && sessionObj.isLogin){
    console.log(sessionObj.isLogin)
    this.isLogin = sessionObj.isLogin
    }
  }
  navigatePage(endPoint: string) {
    this._sharedService.navigatePage(endPoint);
  }
  logout(endPoint){
    localStorage.removeItem('userMetaData');
    this.isLogin = false;
    this._sharedService.navigatePage(endPoint);
  };
}
