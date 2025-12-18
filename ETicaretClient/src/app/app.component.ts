import { Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { MessageType, Position } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService : AuthService, private toastrService : CustomToastrService,private router: Router,private httpClientService: HttpClientService){





    authService.identityCheck();
  }  

  signOut(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.authService.identityCheck();
    this.router.navigate([""]).then(() => {
    location.reload(); // Sayfayı tamamen yeniler
  });
    this.toastrService.message("Oturumunuz kapatıldı.","Oturum kapatıldı.",{messageType: ToastrMessageType.Warning,position: ToastrPosition.TopRight})
  }
  
}



