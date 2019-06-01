import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { FormBuilder } from '@angular/forms';
import { RestClientService } from './rest.client.service';
import { environment } from './../environments/environment'
import { DataShareService } from './datashare.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  user: any;
  existinguser: any;
  ngOnInit(): void {

    this.title = 'mysweethome';
    this.router.navigate(['/calendar']);
  }
  constructor(private formBuilder: FormBuilder,
    private socialAuthService: AuthService,
    private restclient: RestClientService,
    private datashare: DataShareService,
    private router: Router
  ) { }
  ///gmail sigin 
  public socialSignIn() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    let registeredUsers;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(" sign in data : ", userData);
        this.user = userData;

        if (this.user.email != null) {
          this.restclient.get(environment.getregisteredusers).subscribe(
            (result) => {
              registeredUsers = result
              registeredUsers.forEach(element => {
                if (element.email == this.user.email) {
                  this.routeUser(this.user);
                  this.existinguser = true;

                }
              });
              if (!this.existinguser) {
                this.restclient.post(environment.addnewuser, this.user).subscribe(
                  (result) => {
                    this.routeUser(this.user);
                  }
                )
              }
            }, (error) => {
              console.log(error);
            });
        }
      }
    );

  }


  //Routing to home page
  public routeUser(userinfo) {
    this.datashare.setUserData(userinfo);
    this.router.navigate(['/home']);

  }
}

