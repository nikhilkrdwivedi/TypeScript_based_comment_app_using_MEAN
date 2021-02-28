import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  baseUrl: string = '';
  userMetaData:any={}
  constructor(public _http: HttpClient) {
    this.baseUrl =  environment.baseUrl
    this.userMetaData = JSON.parse(sessionStorage.getItem('userMetaData'))
   }
  getHeader(){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'user_id':this.userMetaData.user_id});
    return {headers}
 }
  login(ob:any){
    return this._http.post(`${this.baseUrl}/api/v1/login`,ob);
  }
  getComments(){
    return this._http.get(`${this.baseUrl}/api/v1/comments`);
  }
  postComment(ob:any){
   return this._http.post(`${this.baseUrl}/api/v1/comments`,ob,this.getHeader())
  }
  deleteComment(commentId:string){
    return this._http.delete(`${this.baseUrl}/api/v1/comments/${commentId}`,this.getHeader())
  }
}
