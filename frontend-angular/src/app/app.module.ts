import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angular-6-social-login";

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AlertComponent } from './_components';
import { StudentComponent } from "@/student/student.component";
import { PizzaComponent } from "@/pizza/pizza.component";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("48558240281-7h99uhuuavmqgb2tffttcc9j4esr8se8.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
				FormsModule,
        HttpClientModule,
        appRoutingModule,
				SocialLoginModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        StudentComponent,
        LoginComponent,
        AlertComponent,
				PizzaComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
				{
					provide: AuthServiceConfig,
					useFactory: getAuthServiceConfigs
				}
		],
    bootstrap: [AppComponent]
})
export class AppModule { }
