import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/user/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder:FormBuilder, private userService: UserService,spinner: NgxSpinnerService, private toastrService : CustomToastrService) 
  {super(spinner)}

  frm:FormGroup;

  ngOnInit(): void {
      this.frm=this.formBuilder.group({
      nameSurname: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ]],
      password: ["",[
        Validators.required,
        Validators.maxLength(250),
      ]],
      password2: ["",[
        Validators.required,
        Validators.maxLength(250),
      ]]
    }, {
      validators :  (group: AbstractControl) : ValidationErrors | null=> {
        let password = group.get('password').value;
        let password2 = group.get('password2').value;
        return password ===password2 ? null : {notSame: true};
    }
    });
  }
  
  get component(){
    return this.frm.controls;// en son burada kaldın 37. video, 35. dakika
  } 

  submitted : boolean=false;
  async onSubmit(data : User){
    this.submitted=true;
    var c =this.component;
    var f = this.frm;
    console.log("qweqwe")
    if(this.frm.invalid){
      return;
    }

    const result : Create_User=await this.userService.create(data);
    if(result.succeeded){
      this.toastrService.message(result.message,"Kullanıcı kaydı başarılı.",{
        messageType : ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    else{
      this.toastrService.message(result.message,"Kullanıcı kaydı sırasında beklenmeyen bir hata oluşmuştur.",{
        messageType : ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
    }
    console.log(result.message);
  }

}
