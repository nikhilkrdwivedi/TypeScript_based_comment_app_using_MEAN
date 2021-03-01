import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  private baseUrl =  environment.baseUrl
  private userMetaData = JSON.parse(sessionStorage.getItem('userMetaData'))
 
  constructor(public _http: HttpClient) {}
  getHeader(userId:string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'user_id':userId});
    return {headers}
 }
  login(ob:any){
    return this._http.post(`${this.baseUrl}/api/v1/login`,ob);
  }
  getComments(){
    return this._http.get(`${this.baseUrl}/api/v1/comments`);
  }
  postComment(ob:any,userId:string){
   return this._http.post(`${this.baseUrl}/api/v1/comments`,ob,this.getHeader(userId));
  }
  deleteComment(commentId:string,userId:string){
    return this._http.delete(`${this.baseUrl}/api/v1/comments/${commentId}`,this.getHeader(userId));
  }
  bulkUserUpload(formData:any){
    return this._http.post(`${this.baseUrl}/api/v1/userUpload`, formData,{ observe: 'response'});
  }
}
