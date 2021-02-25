import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _router: Router) { }
  
  navigatePage(endPoint: string) {
    this._router.navigate([`/${endPoint}`]);
  }
}
