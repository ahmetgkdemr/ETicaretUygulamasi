import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/user/create_user';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user : User) : Promise<Create_User> {
    const observable : Observable<Create_User | User>=this.httpClientService.post<Create_User | User>({
      controller: "users"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }  

  async login(usernameOrEmail:string, password: string, callBackFunction?: ()=>void): Promise<any> {
    const observable: Observable<any | TokenResponse>=this.httpClientService.post<any | TokenResponse>({
      controller: "users",
      action: "login"
    },{usernameOrEmail,password})

    const tokenResponse: TokenResponse=await firstValueFrom(observable) as TokenResponse; // burada observable değerin await ile alamadığımız için first value from ile promise dönüşüm işlemi yaparız
    if(TokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş başarılı.",{
        messageType: ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }

}
