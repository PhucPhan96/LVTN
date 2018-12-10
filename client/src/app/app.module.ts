import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileDropDirective, FileUploadModule  } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

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
import { ListmemberComponent } from './components/group/listmember/listmember.component';

import { LoginService } from './../app/services/login.service';
import { AuthGuard } from './services/auth.guard';
import { UserService } from './services/user.service';
import { FriendService } from './services/friend.service';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';
import { WebsocketService } from './services/websocket.service';
import { GroupService } from './services/group.service';
import { EventService } from './services/event.service';
import { Config } from './app.cofig';
import { CommentComponent } from './components/group/gr-newfeed/comment/comment.component';
import { PostComponent } from './components/group/gr-newfeed/post/post.component';
import { SortDatePipe } from './pipe/sortDate';
import { EventDetailComponent } from './components/events/event-detail/event-detail.component';
import { MyeventComponent } from './components/events/myevent/myevent.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { ResultpepleComponent } from './components/searchresult/resultpeple/resultpeple.component';
import { ResultgroupComponent } from './components/searchresult/resultgroup/resultgroup.component';
import { ResulteventComponent } from './components/searchresult/resultevent/resultevent.component';
import { CreatePlanComponent } from './components/group/create-plan/create-plan.component';

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
      { path: 'events', component: MyeventComponent },
      { path: 'createEvent', component: CreateEventComponent },
      { path: 'creategroup', component: CreateGroupComponent },
      { path: 'searchresult', component: SearchresultComponent }
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
      { path: 'newfeed', component: GrNewfeedComponent },
      { path: 'createEvent', component: CreateEventComponent },
      { path: 'events', component: EventsComponent },
      { path: 'intro', component: IntroGroupComponent },
      { path: 'mngroup', component: MngroupComponent },
      { path: 'creategroup', component: CreateGroupComponent },
      { path: 'member', component: ListmemberComponent },
      { path: 'createplan', component: CreatePlanComponent}
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
    ListmemberComponent,
    TimeAgoPipe,
    CommentComponent,
    PostComponent,
    SortDatePipe,
    EventDetailComponent,
    MyeventComponent,
    SearchresultComponent,
    ResultpepleComponent,
    ResultgroupComponent,
    ResulteventComponent,
    CreatePlanComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    Config,
    LoginService,
    UserService,
    AuthGuard,
    FriendService,
    ConversationService,
    MessageService,
    WebsocketService,
    GroupService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
