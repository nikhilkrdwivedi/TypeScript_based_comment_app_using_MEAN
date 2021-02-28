import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from 'src/app/http-calls.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showLoader: boolean = true;
  constructor(private _sharedService : SharedService,private _httpCallsService:HttpCallsService) { }

  ngOnInit(): void {
    this._httpCallsService.login({
      email:'nikhil@gmail.com',
      password:'djcvchvdj'
    }).subscribe((res:any)=>{
      console.log('res ',res)
    },err=>{
      console.log(err)
    })
  }
  navigatePage(endPoint: string) {
    this._sharedService.navigatePage(endPoint);
  }

}
