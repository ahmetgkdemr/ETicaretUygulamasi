import { CanActivateFn,Router } from '@angular/router';
import {inject} from '@angular/core'
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import { AuthService } from 'src/app/services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // const token: string =localStorage.getItem("accessToken");
  // const jwtHelper=inject(JwtHelperService);
  const router = inject(Router);
  const toastrService= inject(CustomToastrService)
  const spinner = inject(NgxSpinnerService)
  const authService=inject(AuthService)

  spinner.show(SpinnerType.BallAtom);

   authService.identityCheck(); //bu mekanizma tokenın durumunu kontrol ediyor angular tarafında.
  // let expired : boolean;
  
  // try {
  //   expired = jwtHelper.isTokenExpired(token);
  // } catch {
  //   expired=true;
  // }
  
  if(!_isAuthenticated){
    router.navigate(["login"], {queryParams : { returnUrl: state.url}});
    toastrService.message("Oturum açmanız gerekiyor.", "Yetkisiz erişim. ", {messageType : ToastrMessageType.Warning , position:ToastrPosition.TopRight})
  }

  spinner.hide(SpinnerType.BallAtom);
  return true;
};
