import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private activateRoute: ActivatedRoute, private alertifyService: AlertifyService, private userService:UserService, private router: Router) {
    //activateRoute parametrelerini kullanmak için constructor içine ekledik
    super(spinner)};
  
  state : any; // sayfa açılır açılmaz bizim linkdeki /token bilgisi geçerli ise update password componentini gösterecek, geçerli değilse göstermeyecek 

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    this.activateRoute.params.subscribe(async params=>{
        const userId= params["userId"];
        const resetToken=params["resetToken"];
        this.state=await this.userAuthService.verifyResetToken(resetToken,userId,()=>{
          this.state=true;
          this.hideSpinner(SpinnerType.BallAtom);
        });
    });
  }

  updatePassword(password:string, passwordConfirm:string){
    this.showSpinner(SpinnerType.BallAtom);
    if(password!=passwordConfirm){
      this.alertifyService.message("Girmiş olduğunuz şifreler aynı değil!",{
        messageType: MessageType.Notify, position: Position.BottomCenter
      });
      this.hideSpinner(SpinnerType.BallAtom);
      return;
    }

    //urldeki parametreleri almak için activateRoute kullanırız
    this.activateRoute.params.subscribe(async params=>{
      const userId= params["userId"];
      const resetToken=params["resetToken"];
      await this.userService.updatePassword(userId,resetToken,password,passwordConfirm,()=>
        {
        this.alertifyService.message("Şifreniz başarıyla güncellenmiştir.",{
          messageType: MessageType.Success, position: Position.BottomCenter
        });
        this.router.navigate(["/login"]);
        this.hideSpinner(SpinnerType.BallAtom);
      }),
      error=>{
        this.alertifyService.message("Şifre güncelleme işlemi sırasında beklenmeyen bir hata oluştu.",{
          messageType: MessageType.Error, position: Position.BottomCenter
        });
        this.hideSpinner(SpinnerType.BallAtom);
      }
    });

  }

} 
