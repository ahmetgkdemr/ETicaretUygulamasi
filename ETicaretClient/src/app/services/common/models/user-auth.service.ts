import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }
  
    async login(usernameOrEmail:string, password: string, callBackFunction?: ()=>void): Promise<any> {
    const observable: Observable<any | TokenResponse>=this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    },{usernameOrEmail,password})

    const tokenResponse: TokenResponse=await firstValueFrom(observable) as TokenResponse; // burada observable değerin await ile alamadığımız için first value from ile promise dönüşüm işlemi yaparız
    if(TokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş başarılı.",{
        messageType: ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }

    async refreshTokenLogin(refreshToken:string, callBackFunction?: (state)=>void): Promise<any> {
      const observable: Observable<any | TokenResponse>=this.httpClientService.post({
        controller: "auth",
        action: "refreshtokenlogin"
      },{refreshToken : refreshToken})

      try {
        const tokenResponse : TokenResponse=await firstValueFrom(observable) as TokenResponse;
      if(tokenResponse){
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }
      callBackFunction(tokenResponse ? true : false);
      } catch (error) {
        callBackFunction(false);
      }
    }

    async googleLogin(user : SocialUser, callBackFunction?: ()=>void ){
    const observable: Observable<SocialUser | TokenResponse>= this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    },user)

    const tokenResponse: TokenResponse=await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
      this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.", "Giriş başarılı.",{
          messageType: ToastrMessageType.Success, position : ToastrPosition.TopRight
      })
    }
    callBackFunction();
    }

    async facebookLogin(user: SocialUser, callBackFunction?: ()=>void){
      const observable : Observable<SocialUser | TokenResponse>=await this.httpClientService.post({
        controller: "auth",
        action: "facebook-login"
      },user)
      const tokenResponse : TokenResponse=await firstValueFrom(observable) as TokenResponse;

      if(tokenResponse){
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
        this.toastrService.message("Facebook üzerinden giriş başarıyla sağlanmıştır.","Giriş başarılı.",{
          messageType : ToastrMessageType.Success, position: ToastrPosition.TopRight
        })
      }
      callBackFunction();
    }

    async passwordReset(email : string , callBackFunction?:()=>void){
      const observable: Observable<any>=await this.httpClientService.post({
        controller: "auth",
        action: "password-reset"
      }, {email :email});
      await firstValueFrom(observable);
      callBackFunction();
    }

    async verifyResetToken(resetToken : string, userId: string, callBackFunction?: ()=>void): Promise<boolean>{
      const observable: Observable<any>=await this.httpClientService.post({
        controller: "auth",
        action: "verify-reset-token"
      }, {resetToken : resetToken, userId : userId });
      const state: boolean=await firstValueFrom(observable);
      callBackFunction();
      return state;
    }

}
