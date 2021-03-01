import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLogin: boolean = false;
  userMetaData:any={}
  constructor(private _sharedService : SharedService) { }

  ngOnInit(): void {
    this.userMetaData = JSON.parse((sessionStorage.getItem('userMetaData')));
    console.log(this.userMetaData )
    if(this.userMetaData && this.userMetaData.isLogin){
    console.log(this.userMetaData.isLogin)
    this.isLogin = this.userMetaData.isLogin
    }
  }
  navigatePage(endPoint: string) {
    this._sharedService.navigatePage(endPoint);
  }
  logout(endPoint:string){
    sessionStorage.removeItem('userMetaData');
    this.isLogin = false;
    this._sharedService.navigatePage(endPoint);
    window.location.reload()
  };
}
