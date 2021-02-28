import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserBulkUploadComponent } from './components/user-bulk-upload/user-bulk-upload.component';
import { HomeComponent } from './components/home/home.component';
import { CommentWindowComponent } from './components/comment-window/comment-window.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpCallsService } from './http-calls.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserBulkUploadComponent,
    HomeComponent,
    CommentWindowComponent,
    NotFoundComponent,
    LoginComponent,
    UserProfileComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [SharedService,HttpCallsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
