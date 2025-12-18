import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent{
  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService, private authService : AuthService,private activatedRoute: ActivatedRoute, private router:Router, private socialAuthService: SocialAuthService) {
    super(spinner);
    //aşağıda user: SocialUser bırakmış hoca ben | null da ekledim spinner kapansın diye alltaki if le birlikte çalışıyorlar
    socialAuthService.authState.subscribe(async (user: SocialUser|null) =>{
    console.log(user);

    if (!user) {
        this.hideSpinner(SpinnerType.BallAtom); // garantiye almak istersen
        return;
      }//spinner yetkisiz kayıt sonrası kapanmıyordu ben de null gelme ihtimalinek karşı böyle bir çözdüm buldum bunu yazdım if null ise user 

    this.showSpinner(SpinnerType.BallAtom);
      switch (user.provider){
        case "GOOGLE" : 
          await userAuthService.googleLogin(user,()=> 
          {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.BallAtom)
          })
          break;
        case "FACEBOOK" : 
          await userAuthService.facebookLogin(user,()=>
          {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.BallAtom)
          })
          break;
      }
    })
  }

  login(usernameOrEmail :string,password: string){
    this.showSpinner(SpinnerType.BallAtom);
    this.userAuthService.login(usernameOrEmail, password, ()=>{
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params=>{
        const returnUrl:string= params["returnUrl"];
        if(returnUrl)
          this.router.navigate([returnUrl]);
        else{
          this.router.navigate(["admin"]);// bu kodu ben yazdım 
        }
      })
      this.hideSpinner(SpinnerType.BallAtom);
    })
  }

  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
