import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private _sharedService : SharedService) { }

  ngOnInit(): void {
  }

  navigatePage(endPoint: string) {
      this._sharedService.navigatePage(endPoint);
  }
  
}
