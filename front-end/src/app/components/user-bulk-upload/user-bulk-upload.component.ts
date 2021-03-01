import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { HttpCallsService } from 'src/app/http-calls.service';
@Component({
  selector: 'app-user-bulk-upload',
  templateUrl: './user-bulk-upload.component.html',
  styleUrls: ['./user-bulk-upload.component.scss']
})
export class UserBulkUploadComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  uploadFormHttpMsgText: string;
  httpCallStatus: boolean

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _httpCallsService: HttpCallsService
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }

  onFileSelect(event) {
    this.uploadFormHttpMsgText = ''
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      }
    }
  }


  onFormSubmit() {

    if (!this.fileUploadForm.get('myfile').value) {
      this.httpCallStatus = false
      this.uploadFormHttpMsgText = 'Please select file first.'
      return false;
    }

    const formData = new FormData();
    formData.append('UserList', this.fileUploadForm.get('myfile').value);
    this._httpCallsService.bulkUserUpload(formData).subscribe((res: HttpResponse<any>) => {
      console.log(res, ' = ', res.status);
      if (res.status === 200) {
        // Reset the file input
        this.httpCallStatus = true
        this.uploadFormHttpMsgText = 'Successfully uploaded'
        this.uploadFileInput.nativeElement.value = "";
        this.fileInputLabel = undefined;
        this.fileUploadForm.reset();
      }
    }, error => {
      this.uploadFileInput.nativeElement.value = "";
      this.fileInputLabel = undefined;
      console.log(error);
      this.uploadFormHttpMsgText = error.error.errorMsg
      this.httpCallStatus = false
    });
  }

}
