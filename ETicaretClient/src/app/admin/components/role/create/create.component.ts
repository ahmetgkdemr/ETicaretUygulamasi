import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent{
  constructor(
    private roleService: RoleService, 
    spinner:NgxSpinnerService,  
    private alertify:AlertifyService){
    super(spinner)
  }
  ngOnInit(): void {
  }

  @Output() createRole:EventEmitter<string>=new EventEmitter(); 

  create(name: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);

    this.roleService.create(name.value,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Role Başarıyla Eklenmiştir",{dissmissOthers:true,messageType:MessageType.Success,position:Position.TopRight});
      this.createRole.emit(name.value); //2  bu şuan bir dış katmana attı yakalıcaz bunu şimdi
    }, errorMessage=>{
      this.alertify.message(errorMessage,{dissmissOthers:true,messageType:MessageType.Error,position:Position.BottomRight})
    })
  }
}
