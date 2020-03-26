import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// TOAST
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { FolderComponent } from './components/home/folder/folder.component';
import { AddfolderComponent } from './components/home/addfolder/addfolder.component';

// SERVICES
import { LoginService } from './services/login.service';
import { EmitService } from './services/emit/emit.service';


// SERVICES EXTERNALS
import { NgxSpinnerModule } from 'ngx-spinner';


// GUARDS
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes:Routes = [
	{
	    path: '',
      redirectTo: "/login",
      pathMatch: 'full'
	},
	{
	    path: 'login',
	    component: LoginComponent,
      canActivate: [LoggedGuard]
	},
  {
      path: 'register',
      component: RegisterComponent,
      canActivate: [LoggedGuard]
  },
  { 
      path: 'keymarker', 
      component: HomeComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'profile',
          component: ProfileComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'folder/:id',
          component: FolderComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'add-folder',
          component: AddfolderComponent,
          canActivate: [AuthGuard]
        }
      ]
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    Error404Component,
    RegisterComponent,
    ProfileComponent,
    FolderComponent,
    AddfolderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [
    LoginService,
    EmitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
