import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './authentication/login/login.component';
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
import { UsersComponent } from './users/users.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { UpdateUserComponent } from './update-user/update-user.component';



export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    CataloguesComponent,
    LoginComponent,
    TeachersComponent,
    MarksComponent,
    UsersComponent,
    MessageFormComponent,
    UpdateUserComponent,
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
      { path: 'login', component: LoginComponent },
      { path: 'catalogues', component: CataloguesComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'marks', component: MarksComponent },
      { path: 'users', component: UsersComponent },
      { path: 'message-form', component: MessageFormComponent },
      { path: 'updateUser', component: UpdateUserComponent },
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
  providers: [NavMenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
