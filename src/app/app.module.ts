import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

// SERVICES
import { LoginService } from './services/login.service';

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
      path: 'home', 
      component: HomeComponent,
      canActivate: [AuthGuard]
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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
