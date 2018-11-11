import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { EditprofComponent } from './components/editprof/editprof.component';
import { ChatComponent } from './components/chat/chat.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { FriendlistComponent } from './components/friendlist/friendlist.component';
import { NewfeedsComponent } from './components/newfeeds/newfeeds.component';
import { EditBasicComponent } from './components/edit-basic/edit-basic.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { EventsComponent } from './components/events/events.component';
import { ListgroupComponent } from './components/listgroup/listgroup.component';
import { GroupComponent } from './components/group/group.component';
import { GrNewfeedComponent } from './components/group/gr-newfeed/gr-newfeed.component';
import { IntroGroupComponent } from './components/group/intro-group/intro-group.component';
import { CreateGroupComponent } from './components/group/create-group/create-group.component';
import { MngroupComponent } from './components/group/mngroup/mngroup.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { LoginService } from './../app/services/login.service';
import { AuthGuard } from './services/auth.guard';
import { UserService } from './services/user.service';
import { Config } from './app.cofig';

const appRoutes : Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomepageComponent,
    canActivate : [AuthGuard],
    children: [
      { path: 'home', component: NewfeedsComponent },
      { path: 'friend', component: FriendlistComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'group', component: ListgroupComponent },
      { path: 'events', component: EventsComponent },
      { path: 'createEvent', component: CreateEventComponent },
      { path: 'creategroup', component: CreateGroupComponent }
    ]
  },
  {
    path: 'editprof',
    component: EditprofComponent,
    children: [
      { path: 'basicInfo', component: BasicInfoComponent },
      { path: 'changeBasicInfo', component: EditBasicComponent },
      { path: 'changePass', component: ChangePassComponent }
    ]
  },
  {
    path: 'groupdetail',
    component: GroupComponent,
    children: [
      // { path: 'newfeed', component: GrNewfeedComponent },
      { path: 'createEvent', component: CreateEventComponent },
      { path: 'events', component: EventsComponent },
      { path: 'intro', component: IntroGroupComponent },
      { path: 'mngroup', component: MngroupComponent },
      { path: 'creategroup', component: CreateGroupComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    HeaderComponent,
    EditprofComponent,
    ChatComponent,
    CreateEventComponent,
    FriendlistComponent,
    NewfeedsComponent,
    EditBasicComponent,
    ChangePassComponent,
    EventsComponent,
    ListgroupComponent,
    GroupComponent,
    GrNewfeedComponent,
    IntroGroupComponent,
    CreateGroupComponent,
    MngroupComponent,
    BasicInfoComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    Config,
    LoginService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
