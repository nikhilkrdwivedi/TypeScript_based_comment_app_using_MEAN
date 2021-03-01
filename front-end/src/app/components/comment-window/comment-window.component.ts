import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpCallsService } from 'src/app/http-calls.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
@Component({
  selector: 'app-comment-window',
  templateUrl: './comment-window.component.html',
  styleUrls: ['./comment-window.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
  ])
]
})
export class CommentWindowComponent implements OnInit {

  constructor(private _fb: FormBuilder,private _httpCallsService:HttpCallsService) { }

  commentForm = this._fb.group({
    comment: [null],
  });
  comments:any[]=[]
  container: HTMLElement;
  ar:any[]=[]
  state: string = 'default';
  userMetaData:any={}
  commentErrorText:string=''

  ngOnInit(): void {
    this.userMetaData = JSON.parse(sessionStorage.getItem('userMetaData'))
    this.getComments()
  }

  addComment(){
    this.commentErrorText = '';
    console.log('this.commentForm ',this.commentForm.value)
    this.ar.push(this.commentForm.value.comment);
    if(this.commentForm.value.comment){
      let commentObj ={
      'comment':this.commentForm.value.comment,
      }
      this.commentForm.reset();
      this._httpCallsService.postComment(commentObj,this.userMetaData.user_id).subscribe((res:any)=>{
        console.log('res  : ',res)
        this.getComments()
      },err=>{
        this.commentErrorText = err.error.errorMsg;
      })
    }
  }

  getComments(){
    this.commentErrorText = '';
    this._httpCallsService.getComments().subscribe((res:any)=>{
      this.comments = res['data'][0]
      console.log(this.comments)
    },err=>{
      this.commentErrorText = err.error.errorMsg;
    })
  }

  deleteComment(commentId){
    this.commentErrorText = '';
    this._httpCallsService.deleteComment(commentId,this.userMetaData.user_id).subscribe((res:any)=>{
      console.log(res)
      this.getComments()
    },err=>{
      this.commentErrorText = err.error.errorMsg;
    })
  }
  rotate(){
    this.state = (this.state === 'default' ? 'rotated' : 'default');
}
}
