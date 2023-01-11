import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './register/register.component';
import { CataloguesComponent} from './students/catalogues.component';
import { MarksComponent } from './marks/marks.component';
import { TeachersComponent } from './teachers/teachers.component';


// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// auth
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './shared/guards/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { UsersComponent } from './users/users.component';
import { MessageFormComponent } from './message-form/message-form.component';




export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    LoginComponent,
    FetchDataComponent,
    RegisterComponent,
    CataloguesComponent,
    LoginComponent,
    ForbiddenComponent,
    PrivacyComponent,
    TeachersComponent,
    MarksComponent,
    UsersComponent,
    MessageFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'counter', component: CounterComponent, canActivate: [AuthGuard]  },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'catalogues', component: CataloguesComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'marks', component: MarksComponent },
      { path: 'users', component: UsersComponent },
      {path: 'message-form', component: MessageFormComponent}
    ]),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44350"],
        blacklistedRoutes: []
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
